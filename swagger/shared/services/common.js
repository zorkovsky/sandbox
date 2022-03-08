import axios from 'axios';
import * as uuidLib from 'uuidv4';
import {validatorWithContext, softValidatorWithContext, checkValResult, jwtUserValidate} from '../schemas/validate';
import {contextDone, contextResponse, jsonTransform, deepTransform} from '../schemas/utils';
import {checkEntitlement} from '../services/entitlement';
import {createQuery} from '../services/queryUtils';
import * as enums from '../schemas/enumerations';
import decodeJWT from 'jwt-decode';

export const etagErrorDataTransform = async ({context, cfg, functionName}, data, origData, customDataSrc) => {
    try {
        // define json transformation object
        let transformObj = cfg.fncConfig.doc2Response;
        if (cfg.fncConfig.customData === 'newId') {
            transformObj = `($entityId := "${customDataSrc.newId}"; ${transformObj})`;
        } else if (cfg.fncConfig.entityIdAttribute) {
            transformObj = `($entityId := "${origData.updateEntityReference[cfg.fncConfig.entityIdAttribute]}"; ${transformObj})`;
        }

        // transformation of document to response
        const responseData = jsonTransform(
            data, 
            transformObj,
            `${functionName} "document to response when etag error"`,
            context);
        return responseData;
    } catch (e) {
        return null;
    }
};

/*
readOne - reads one document from CosmosDB:
- appConfig contains specification of database parameters (databaseDefinition object)
- stepConfig contains specification of name of attribute which contains document id (documentIdAttribute)
*/
export const readOne = async ({client, context, cfg, functionName}, data, schemas, origData, customDataSrc) => {
    try {
        const {stepConfig: {documentIdAttributePath, documentIdAttribute, docNewVersion, entityIdAttribute, customData}} = cfg;
        const sqlStatement = `SELECT * FROM d WHERE d.${documentIdAttributePath ? documentIdAttributePath : "id"}
            = @documentId and d.documentHeader.technicalState = "Active"`;
        const sqlParameters = [{
            name: '@documentId',
            value: data.entityReference ? data.entityReference[documentIdAttribute] : data.updateEntityReference[documentIdAttribute]
        }];
        const {resources: items} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container(cfg.appConfig.databaseDefinition.collection).items
            .query({
                query: sqlStatement,
                parameters: sqlParameters
            })
            .fetchAll();
        if (items.length !== 1) {
            contextResponse(context, 400, {
                errorMessage: `${functionName} error - ${items.length === 0 ? "No entity exists" : "Too many entities exist"}`
            });
            return null;
        }
        const [doc] = items;

        if (docNewVersion) {
            // define json transformation object
            let transformObj = docNewVersion;
            if (customData === 'newId') {
                const newId = uuidLib.uuid();
                transformObj = `($entityId := "${newId}"; ${transformObj})`;
                customDataSrc.newId = newId;
            } else if (entityIdAttribute) {
                transformObj = `($entityId := "${data.updateEntityReference[entityIdAttribute]}"; ${transformObj})`;
            }
            // Creating of new version of document from previous document version and request data
            const newData = jsonTransform(
                {requestData: data, currentDoc: doc},
                transformObj,
                `${functionName} "request and current document to new document"`,
                context);
            return newData;
        }
        return {requestData: data, currentDoc: doc};
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName} db read operation failed, ${e}`
        });
        return null;
    }
};

/*
readOneWithEtag - reads one document from CosmosDB, validates its etag and transform it together with content of data into newData:
- appConfig contains specification of database parameters (databaseDefinition object)
- stepConfig contains specification of:
    - name of attribute which contains document id (documentIdAttribute)
    - name of attribute which contains entity id (entityIdAttribute)
    - data which are placed into transformation as input parameters (customData)
    - tranfrormation of read document and already collected data to the newData (docNewVersion)
*/
export const readOneWithEtag = async ({client, context, cfg, functionName}, data, schemas, origData, customDataSrc) => {
    try {
        const {stepConfig: {documentIdAttributePath, documentIdAttribute, docNewVersion, entityIdAttribute, customData}} = cfg;
        const sqlStatement = `SELECT * FROM d WHERE d.${documentIdAttributePath ? documentIdAttributePath : "id"}
            = @documentId and d.documentHeader.technicalState = "Active"`;
        const sqlParameters = [{name: '@documentId', value: data.updateEntityReference[documentIdAttribute]}];
        const {resources: items} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container(cfg.appConfig.databaseDefinition.collection).items
            .query({query: sqlStatement, parameters: sqlParameters})
            .fetchAll();
        if (items.length !== 1) {
            contextResponse(context, 400, {
                errorMessage: `${functionName} error - ${items.length === 0 ? "No entity exists" : "Too many entities exist"}`
            });
            return null;
        }
        const [doc] = items;
        if (doc._etag !== data.updateEntityReference._etag) {
            const currentData = await etagErrorDataTransform({context, cfg, functionName}, doc, origData, customDataSrc);
            contextResponse(context, 400, {
                errorMessage: `${functionName} error - data changed by concurrent process, ${JSON.stringify(doc.auditInfo)}`,
                auditInfo: doc.auditInfo,
                currentData
            });
            return null;
        }

        if (docNewVersion) {
            // define json transformation object
            let transformObj = docNewVersion;
            if (customData === 'newId') {
                const newId = uuidLib.uuid();
                transformObj = `($entityId := "${newId}"; ${transformObj})`;
                customDataSrc.newId = newId;
            } else if (entityIdAttribute) {
                transformObj = `($entityId := "${data.updateEntityReference[entityIdAttribute]}"; ${transformObj})`;
            }
            // Creating of new version of document from previous document version and request data
            const newData = jsonTransform(
                {requestData: data, currentDoc: doc},
                transformObj,
                `${functionName} "request and current document to new document"`,
                context);
            return newData;
        }
        return {requestData: data, currentDoc: doc};
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName} db read operation failed, ${e}`
        });
        return null;
    }
};

/*
readList - reads list of documents from CosmosDB:
- appConfig contains specification of database parameters (databaseDefinition object)
- stepConfig contains specification of executed select statement (selectDefinition object)
*/
export const readList = async ({client, context, cfg, functionName}, data) => {
    try {
        const querySpec = createQuery({context, cfg, functionName}, data);
        const {resources: items} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container(cfg.appConfig.databaseDefinition.collection).items
            .query(querySpec)
            .fetchAll();

        const {stepConfig: {docListTransform}} = cfg;
        if (docListTransform) {
            const newData = jsonTransform(
                {...data, currentDocList: items},
                docListTransform,
                `${functionName} "previous data and read list of documents to new version of data"`,
                context);
            return newData;
        }
        return {...data, currentDocList: items};
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName} db read operation failed, ${e}`
        });
        return null;
    }
};

/*
createDocAndArchive - creates new document in CosmosDB and creates audit log record:
- appConfig contains specification of database parameters (databaseDefinition object)
- stepConfig contains specification of:
    - name of Joi schema used for document validation before its storage (modelSchema)
    - version of Joi schema used for document validation before its storage (modelSchemaVersion)
*/
export const createDocAndArchive = async ({client, context, cfg, functionName}, data, schemas, origData) => {
    try {
        context.log(`${functionName} db create operation for, ${JSON.stringify(data)}`);

        // Audit info should not be part of configuration
        const now = new Date();
        data.auditInfo = {
            createdWhen: now.toISOString(),
            createdBy: origData.requestorIdentity.onBehalfOf ? origData.requestorIdentity.onBehalfOf : origData.requestorIdentity.requestor,
            modifiedWhen: now.toISOString(),
            modifiedBy: origData.requestorIdentity.onBehalfOf ? origData.requestorIdentity.onBehalfOf : origData.requestorIdentity.requestor
        };

        const validateResult = validatorWithContext(context, cfg.stepConfig.modelSchema, schemas.model, 'Database', data, cfg.stepConfig.modelSchemaVersion);
        if (!checkValResult(validateResult, context, data, `${functionName} model`)) {
            return null;
        }

        const {resource: doc} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container(cfg.appConfig.databaseDefinition.collection).items
            .create(data);
        const archive = {...doc};
        archive.archiveOf = archive.id;
        archive.archiveDate = now.valueOf();
        delete archive.id;
        // eslint-disable-next-line no-unused-vars
        const {resource: archiveDoc} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container(`${cfg.appConfig.databaseDefinition.collection}_archive`).items
            .create(archive);
        return doc;
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName} db create operation failed, ${e}`
        });
        return null;
    }
};

/*
updateDocAndCreateArchive - updates document in CosmosDB and creates audit log record:
- appConfig contains specification of database parameters (databaseDefinition object)
- stepConfig contains specification of:
    - name of Joi schema used for document validation before its storage (modelSchema)
    - version of Joi schema used for document validation before its storage (modelSchemaVersion)
*/
export const updateDocAndCreateArchive = async ({client, context, cfg, functionName}, data, schemas, origData) => {
    try {
        context.log(`${functionName} db save operation for, ${JSON.stringify(data)}`);

        // Audit info should not be part of configuration
        const now = new Date();
        data.auditInfo = {
            ...data.auditInfo,
            modifiedWhen: now.toISOString(),
            modifiedBy: origData.requestorIdentity.onBehalfOf ? origData.requestorIdentity.onBehalfOf : origData.requestorIdentity.requestor
        };

        const validateResult = validatorWithContext(context, cfg.stepConfig.modelSchema, schemas.model, 'Database', data, cfg.stepConfig.modelSchemaVersion);
        if (!checkValResult(validateResult, context, data, `${functionName} model`)) {
            return null;
        }

        const {resource: doc} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container(cfg.appConfig.databaseDefinition.collection)
            .item(data.id)
            .replace(data, {accessCondition: {type: "IfMatch", condition: data._etag}});
        const archive = {...doc};
        archive.archiveOf = archive.id;
        archive.archiveDate = now.valueOf();
        archive.executionContext = {
            invocationId: context.executionContext.invocationId,
            functionName: context.executionContext.functionName,
            originalUrl: context.req.originalUrl,
            token: context.req.headers.authorization,
            requestorIdentity: origData.requestorIdentity,
            updateEntityReference: origData.updateEntityReference
        };
        delete archive.id;
        // eslint-disable-next-line no-unused-vars
        const {resource: archiveDoc} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container(`${cfg.appConfig.databaseDefinition.collection}_archive`).items
            .create(archive);
        return doc;
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName} db save operation failed, ${e}`
        });
        return null;
    }
};

/*
getJsonExternalData - reads data from external service in JSON format:
- appConfig contains specification of database parameters (databaseDefinition object)
- stepConfig contains specification of:
    - service URL which is source of data (serviceUrl)
    - transformation its output are parameters of service call (serviceRequestTransform)
    - tranfrormation of received data and previously collected data to the newData (serviceResponseTransform)
*/
export const getJsonExternalData = async ({context, cfg, functionName}, data) => {
    try {
        const {stepConfig: {serviceUrl, serviceRequestTransform, serviceResponseTransform}} = cfg;
        const serviceParams = jsonTransform(
            data,
            serviceRequestTransform, 
            `${functionName} "data to external service request parameters"`,
            context);

        context.log(`External call to ${serviceUrl} is executed with parameters ${JSON.stringify(serviceParams)}`);
        const response = await axios.get(serviceUrl, serviceParams);

        if (!response || (response.status !== 200 && response.status !== 204)) {
            contextResponse(context, 400, {
                errorMessage: `External call to ${serviceUrl} with ${JSON.stringify(serviceParams)} failed`
            });
            return null;
        }
    
        context.log(`External data received: ${JSON.stringify(response.data)}`);
        // Creating of new version of data from previous data and external service response
        if (serviceResponseTransform) {
            const newData = jsonTransform(
                {currentData: data, externalData: response.data},
                serviceResponseTransform,
                `${functionName} "previous data and external service response to new version of data"`,
                context);
            context.log(`Resulting data are: ${JSON.stringify(newData)}`);
            return newData;
        }
        const newData = {currentData: data, externalData: response.data};
        context.log(`Resulting data are: ${JSON.stringify(newData)}`);
        return newData;
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName} external service ${cfg.stepConfig.serviceUrl} call failed, ${e}`
        });
        return null;
    }
};

/*
getEnumerations - loads enumerations into data:
- stepConfig contains specification of list of enumerations which have to be loaded (enumerations)
*/
export const getEnumerations = async ({context, cfg, functionName}, data) => {
    try {
        context.log(`${functionName}: Loading of enumerations ${JSON.stringify(cfg.fncConfig.enumerations)}`);
        const enumerations = [];
        for (const enumerationList of cfg.fncConfig.enumerations) {
            enumerations.push(enums[enumerationList]);
        }
        const newData = {
            ...data, 
            enumerations
        };
        context.log(`Resulting data are: ${JSON.stringify(newData)}`);
        return newData;
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName}: Loading of enumerations ${JSON.stringify(cfg.fncConfig.enumerations)} failed, ${e}`
        });
        return null;
    }
};

/*
entitlementCheckRequest - validates service call initiator entitlements based on data in request (it has to be used only
    in situation when document is not created yet, i.e. it is create operation which creates new document or reading data from external resource):
- appConfig contains specification of database parameters (databaseDefinition object)
*/
export const entitlementCheckRequest = async ({client, context, cfg, functionName}, newData, schemas, origData) => {
    if (context.tests || await checkEntitlement({client, context, cfg, functionName}, origData.requestorIdentity, {requestData: newData})) {
        return newData;
    }
    contextResponse(context, 400, {
        errorMessage: `${functionName} entitlement check failed`
    });
    return null;
};

/*
entitlementCheck - validates service call initiator entitlements based on data in request and data in already existing document:
- appConfig contains specification of database parameters (databaseDefinition object)
*/
export const entitlementCheck = async ({client, context, cfg, functionName}, newData, schemas, origData) => {
    if (context.tests || await checkEntitlement({client, context, cfg, functionName}, origData.requestorIdentity, newData)) {
        return newData;
    }
    contextResponse(context, 400, {
        errorMessage: `${functionName} entitlement check failed`
    });
    return null;
};

/*
transformData - transform data:
- appConfig contains specification of transformation (transformationDefinition)
*/
export const transformData = async ({context, cfg, functionName}, data, schemas, origData, customDataSrc) => {
    context.log(`${functionName} transformation of request data, ${JSON.stringify(data)}`);
    // define json transformation object
    let transformObj = cfg.stepConfig.transformationDefinition;
    if (cfg.stepConfig.customData === 'newId') {
        const newId = uuidLib.uuid();
        transformObj = `($entityId := "${newId}"; ${transformObj})`;
        customDataSrc.newId = newId;
    } else if (cfg.stepConfig.entityIdAttribute) {
        transformObj = `($entityId := "${data.requestData.updateEntityReference[cfg.stepConfig.entityIdAttribute]}"; ${transformObj})`;
    }
    const transformedData = jsonTransform(
        data, 
        transformObj, 
        `${functionName} "transformation step"`, 
        context);
    if (!transformedData) {
        return null;
    }
    return transformedData;
};

/*
deepTransformData - replaces data parameters by values
*/
export const deepTransformData = async ({context, functionName}, data) => {
    context.log(`${functionName} deep transformation of data ${JSON.stringify(data)}`);
    const transformedData = {...data};
    deepTransform(transformedData, "$UUID", uuidLib.uuid);
    return transformedData;
};

/*
softValidation - validates data and returns validation result as response
- stepConfig contains specification of:
    - name of schema which is used for validation (schemaName)
    - version of schema which is used for validation (schemaVersion)
    - validation context used in schema definition, it is optional (validationContext)
    - name of attribute in the data which contains data for validation, it is optional (attributeName)
*/
export const softValidation = async ({context, cfg, functionName}, data, schemas) => {
    context.log(`${functionName} soft validation of data with parameters, ${JSON.stringify(cfg.stepConfig)}`);
    try {
        const validateResult = softValidatorWithContext(
            context,
            cfg.stepConfig.schemaName,
            schemas.model,
            cfg.stepConfig.validationContext,
            (cfg.stepConfig.attributeName ? data[cfg.stepConfig.attributeName] : data),
            cfg.stepConfig.schemaVersion
        );
        context.log(`${functionName} soft validation result, ${JSON.stringify(validateResult)}`);
        return {...data, validationResult: validateResult};
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${functionName}: Soft validation ${JSON.stringify(cfg.stepConfig)} failed, ${e}`
        });
        return null;
    }
};

export const generalRequest = async ({client: dbClient, context, cfg, functionName}, req, schemas, logicFunctions) => {

    let client = dbClient;
    if (context.tests && context.tests.dbClient) {
        client = context.tests.dbClient;
    }

    const reqData = req.body || {};
    // request validation
    let validateResult = validatorWithContext(
        context, 
        cfg.fncConfig.requestSchema, 
        schemas.request, 
        schemas.validationContext, 
        reqData, 
        cfg.fncConfig.requestSchemaVersion);
    if (!checkValResult(validateResult, context, reqData, `${functionName} request`)) {
        return contextDone(context);
    }

    // data cleaned by request validation
    let newData = validateResult.body;
    const origData = {
        ...newData
    };

    // check if user from request matches user in token (not present in case of test)
    const jwtData = decodeJWT(req.headers.authorization);
    const jwtCheckResponse = await jwtUserValidate(jwtData, newData.requestorIdentity.requestor, context, client, cfg.appConfig);
    if (!context.tests && !jwtCheckResponse.checkResult) {
        return contextDone(context);
    }
    if (jwtCheckResponse.checkResult) {
        newData.jwtData = jwtCheckResponse.jwtData;
    }

    const entitlementCheck = logicFunctions.find(lf => lf[0].name === 'entitlementCheck' || lf[0].name === 'entitlementCheckRequest');
    if (!entitlementCheck) {
        return contextDone(context, 400, {
            errorMessage: `Entitlement check not called`
        });
    }

    // 2nd Phase validation
    if (cfg.fncConfig.phase2auth) {
        if (!await mfaCheck(context, jwtData, cfg, req, functionName, origData)) {
            return contextDone(context);
        }
    }

    // let user store custom data for later use inside of logic function
    const customDataSrc = {};
    for (const [logicFunction, stepConfig] of logicFunctions) {
        cfg.stepConfig = stepConfig;
        newData = await logicFunction({client, context, cfg, functionName}, newData, schemas, origData, customDataSrc);
        if (!newData) {
            return contextDone(context);
        }
    }

    // define json transformation object
    let transformObj = cfg.fncConfig.doc2Response;
    if (cfg.fncConfig.customData === 'newId') {
        transformObj = `($entityId := "${customDataSrc.newId}"; ${transformObj})`;
    } else if (cfg.fncConfig.entityIdAttribute) {
        transformObj = `($entityId := "${origData.updateEntityReference[cfg.fncConfig.entityIdAttribute]}"; ${transformObj})`;
    }

    // transformation of document to response
    const responseData = jsonTransform(
        newData, 
        transformObj,
        `${functionName} "document to response"`,
        context);
    if (!responseData) {
        return contextDone(context);
    }

    // response validation
    validateResult = validatorWithContext(context, cfg.fncConfig.responseSchema, schemas.response, 'Database', responseData, cfg.fncConfig.responseSchemaVersion);
    if (!checkValResult(validateResult, context, responseData, `${functionName} response`)) {
        return contextDone(context);
    }

    return contextDone(context, 200, validateResult.body);
};

const mfaCheck = async (context, {oid}, {appConfig: {mfaRequest: url}}, {headers: {authenticationcode}}, functionName, queryBody) => {
    try {
        const response = await axios.post(
            url, 
            {
                functionName,
                oid,
                authenticationcode,
                queryBody
            }
        );
        if (response.status !== 200) {
            contextResponse(context, response.status, response.data);
            return false;
        }
        return true;
    } catch (e) {
        contextResponse(context, e.response.status, e.response.data);
        return false;
    }
};
