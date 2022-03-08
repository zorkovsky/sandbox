import {contextResponse} from './utils';
import {getActiveParty, getValidPartyRoles} from '../services/party';

export const validator = (context, entityType, schemaConfig, data, definitionVersion='1.0.0') => {
    context.log(`Supported entity validation ${entityType} in version ${definitionVersion}`);

    let {error, value} = schemaConfig.supportedEntity.validate({entityType, definitionVersion});
    if (error) {
        context.log.error(`Validation of data type ${entityType} in version ${definitionVersion} failed, ${error}`);
        return {
            status: 400,
            errorMessage: `${error}`
        };
    }
    context.log(`Validation suceeded, result: ${JSON.stringify(value)}`);

    context.log(`Validating of data, ${JSON.stringify(data)}`);
    ({error, value} = schemaConfig[entityType][definitionVersion].validate(data, {abortEarly: false, stripUnknown: true}));
    if (error) {
        context.log.error(`Validation of data failed, ${error}`);
        return {
            status: 400,
            errorMessage: `${error}`
        };
    }

    context.log(`Validation suceeded, result: ${JSON.stringify(value)}`);
    return {
        status: 200,
        body: value
    };
};

export const validatorWithContext = (context, entityType, schemaConfig, validationContext, data, definitionVersion='1.0.0') => {
    context.log(`Supported entity validation ${entityType} in version ${definitionVersion}`);

    let {error, value} = schemaConfig.supportedEntity.validate({entityType, definitionVersion});
    if (error) {
        context.log.error(`Validation of data type ${entityType} in version ${definitionVersion} failed, ${error}`);
        return {
            status: 400,
            errorMessage: `${error}`
        };
    }
    context.log(`Validation suceeded, result: ${JSON.stringify(value)}`);

    context.log(`Validating of data, ${JSON.stringify(data)}`);
    ({error, value} = schemaConfig[entityType][definitionVersion].validate(data, {abortEarly: false, stripUnknown: true, context: {validationContext}}));
    if (error) {
        context.log.error(`Validation of data failed, ${error}`);
        return {
            status: 400,
            errorMessage: `${error}`
        };
    }

    context.log(`Validation suceeded, result: ${JSON.stringify(value)}`);
    return {
        status: 200,
        body: value
    };
};

export const softValidatorWithContext = (context, entityType, schemaConfig, validationContext, data, definitionVersion='1.0.0') => {
    context.log(`Supported entity validation ${entityType} in version ${definitionVersion}`);

    let {error, value} = schemaConfig.supportedEntity.validate({entityType, definitionVersion});
    if (error) {
        context.log.error(`Validation of data type ${entityType} in version ${definitionVersion} failed, ${error}`);
        return {
            status: 400,
            errorMessage: `${error}`
        };
    }
    context.log(`Validation suceeded, result: ${JSON.stringify(value)}`);

    context.log(`Validating of data, ${JSON.stringify(data)}`);
    ({error, value} = schemaConfig[entityType][definitionVersion].validate(data, {abortEarly: false, stripUnknown: true, context: {validationContext}}));
    if (error) {
        return {
            status: 400,
            errorMessage: `${error}`
        };
    }
    return {
        status: 200
    };
};

export const checkValResult = (validateResult, context, inputData, message) => {
    if (validateResult.status !== 200) {
        contextResponse(context, validateResult.status, {
            inputData,
            errorMessage: validateResult.errorMessage
        });
        context.log.error(`${message} schema validation error ${JSON.stringify(validateResult)}`);
        return false;
    }
    return true;
};

export const jwtUserValidate = async (jwtData, requestor, context, dbClient, functionAppConfig) => {

    // Note the equal error message
    //  Security Rule: authentication error message should not give any indication what is wrong to a possible attacker.
    const errorMessage = 'User check against the JWT token failed.';
    const jwtUserCheckFail = (errorDetail) => {
        context.log.error(errorDetail);
        contextResponse(context, 400, {errorMessage});
        return {checkResult: false};
    };

    try {
        const {userReference, partyRoleReference} = requestor;
        const jwtMails = jwtData.emails.map(email => email.toLowerCase());
        const {oid: userId} = jwtData;

        if (!userReference && !partyRoleReference) {
            return jwtUserCheckFail(`JWT check against user from request data - no userReference and no partyRoleRefernce provided`);
        }

        if (userReference) {
            if (!userReference.userName) {
                return jwtUserCheckFail(`JWT check against user from request data - no userName provided`);
            }
            if (!jwtMails.includes(userReference.userName.toLowerCase())) {
                return jwtUserCheckFail(`JWT check against user from request data - mails do not match`);
            }
        }

        if (partyRoleReference) {
            const {partyId, partyRoleId, partyRoleType} = partyRoleReference;
            if (!partyId || !partyRoleId || !partyRoleType) {
                return jwtUserCheckFail(`JWT check against user from request data - no partyId or no partyRoleId or no partyRoleType provided`);
            }

            const party = await getActiveParty(dbClient, context, partyId, functionAppConfig);
            if (!party) {
                return jwtUserCheckFail(`JWT check against user from request data - no valid party with ${partyId} exist`);
            }

            const partyRoles = getValidPartyRoles(context, party, partyRoleReference) || [];
            for (const partyRole of partyRoles) {
                for (const partyIdentifier of partyRole.validPartyIdentifiers) {
                    if (partyIdentifier.partyIdentifierType === 'UserId' && partyIdentifier.partyIdentifierValue === userId) {
                        return {checkResult: true, jwtData};
                    }
                }
            }
            return jwtUserCheckFail(`JWT check against user from request data - no valid party identifier with UserId from the request exist`);
        }

        return {checkResult: true, jwtData};

    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${errorMessage}, ${e}`
        });
        return {checkResult: false};
    }
};
