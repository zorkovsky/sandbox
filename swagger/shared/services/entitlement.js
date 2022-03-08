import {jsonTransform} from '../schemas/utils';

export const checkEntitlement = async ({client, context, cfg, functionName}, requestorIdentity, entityData) => {
    // Checking entitlement of requestor for given combination of functionName and entityData
    const requestorCheckResult = await checkPartyRoleEntitlement(
        {client, context, cfg, functionName},
        (requestorIdentity.onBehalfOf ? 'OnBehalfOf' : 'DirectUsage'),
        requestorIdentity.requestor.partyRoleReference,
        requestorIdentity.requestor.userReference,
        entityData
    );
    if (requestorCheckResult) {
        // Requestor has entitlement for given combination of functionName and entityData
        if (requestorIdentity.onBehalfOf) {
            // requestorIdentity contains also onBehalfOf element
            // Checking and returning entitlement of "On behalf of" person
            return await checkPartyRoleEntitlement(
                {client, context, cfg, functionName},
                'DirectUsage',
                requestorIdentity.onBehalfOf.partyRoleReference,
                requestorIdentity.onBehalfOf.userReference,
                entityData);
        }
        return true;
    }
    return false;
};

const checkPartyRoleEntitlement = async ({client, context, cfg, functionName}, usageType, partyRoleReference, userReference, entityData) => {
    let entitlements;
    if (partyRoleReference) {
        // Party is identified by party role reference
        entitlements = await getPartyRoleEntitlements({client, context, cfg}, usageType, partyRoleReference.partyRoleId);
        if (!entitlements) {
            // if requestor's personal entitlement settings wasn't found then it is used defaul party role template for corresponding partyRoleType
            entitlements = await getTemplateEntitlements({client, context, cfg}, usageType, 'DefaultSet', partyRoleReference.partyRoleType, null);
        }
    } else {
        // Requestor is identified by user name - it is used user role template for corresponding userRoleType
        entitlements = await getTemplateEntitlements({client, context, cfg}, usageType, 'DefaultSet', null, userReference.userRoleType);
    }

    if (!entitlements) {
        context.log.warn(`Entitlement definition was not found`);
        return false;
    }

    // Checking function level entitlement of requestor
    const foundFunction = entitlements.entitledFunctions.find(ef =>
        ef.functionName === functionName &&
        ef.elementHeader.technicalState === 'Active'
    );

    if (foundFunction) {
        // Checking data level entitlement of requestor
        if (foundFunction.functionSpecification) {
            return jsonTransform(
                entityData, 
                foundFunction.functionSpecification, 
                `${functionName} "data level entitlement check"`, 
                context);
        }
        return true;
    }
    return false;
};

const getPartyRoleEntitlements = async ({client, context, cfg}, usageType, partyRoleId) => {
    context.log(
        `Getting pesonal entitlement settings for specific party role:
            partyRoleId = ${partyRoleId};
            usageType = ${usageType}`
    );

    try {
        const sqlStatement = `SELECT d.documentData.entitledFunctions FROM d
            WHERE
                d.documentData.partyRoleId = @partyRoleId AND
                d.documentData.usageType = @usageType AND
                d.documentHeader.technicalState = "Active"`;
        const sqlParameters = [
            {
                name: '@partyRoleId', 
                value: partyRoleId
            },
            {
                name: '@usageType', 
                value: usageType
            }
        ];
        const {resources: items} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container('PartyRoleEntitlements').items
            .query({
                query: sqlStatement, 
                parameters: sqlParameters
            })
            .fetchAll();

        if (items.length !== 1) {
            if (items.length === 0) {
                context.log.info(`Personal entitlement settings are not defined`);
                return null;
            }
            context.log.error(`Entitlement template fetch error - Too many entitlement template exist"}`);
            return null;
        }
        const [doc] = items;
        return doc;
    } catch (e) {
        context.log.error(`EntitlementTemplates db read operation failed, ${e}`);
        return null;
    }
};

const getTemplateEntitlements = async ({client, context, cfg}, usageType, templateType, partyRoleType, userRoleType) => {
    context.log(`
        Getting entitlement template:
            usageType = ${usageType}
            templateType = ${templateType}
            partyRoleType = ${partyRoleType}
            userRoleType = ${userRoleType}`
    );

    try {
        let sqlStatement = `SELECT d.documentData.entitledFunctions FROM d
            WHERE
                d.documentData.usageType = @usageType AND
                d.documentData.templateType = @templateType AND
                d.documentHeader.technicalState = "Active"`;
        if (partyRoleType) {
            sqlStatement += ` AND d.documentData.partyRoleType = @roleType`;
        } else {
            sqlStatement += ` AND d.documentData.userRoleType = @roleType`;
        }
        const sqlParameters = [
            {
                name: '@usageType', 
                value: usageType
            },
            {
                name: '@templateType', 
                value: templateType
            },
            {
                name: '@roleType', 
                value: (partyRoleType ? partyRoleType : userRoleType)
            }
        ];
        const {resources: items} = await client
            .database(cfg.appConfig.databaseDefinition.database)
            .container('EntitlementTemplates').items
            .query({
                query: sqlStatement, 
                parameters: sqlParameters
            })
            .fetchAll();

        if (items.length !== 1) {
            context.log.error(`Entitlement template fetch error - ${items.length === 0 ? "No active entitlement template exists" : "Too many entitlement template exist"}`);
            return null;
        }
        const [doc] = items;
        return doc;
    } catch (e) {
        context.log.error(`EntitlementTemplates db read operation failed, ${e}`);
        return null;
    }
};
