import joi from 'joi';

import {
    entityTypeSchema,
    requestorIdentitySchema,
    definitionVersionSchema,
    filteringSchema,
    partyRoleTypeESchema,
    userRoleTypeESchema,
    functionNameSchema
} from '../commonElementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('getEntitledFunctionListReq', 'checkEntitlementReq'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'getEntitledFunctionListReq', then: joi.valid('1.0.0')},
                {is: 'checkEntitlementReq', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const getEntitledFunctionListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    filtering: filteringSchema.required()
});

const checkEntitlementReqSchema = joi.object({
    functionName: functionNameSchema.required(),
    requestorIdentity: requestorIdentitySchema.required(),
    partyRoleType: partyRoleTypeESchema,
    userRoleType: userRoleTypeESchema,
    entityData: joi.any().required()
});

const requestContractSchema = {
    supportedEntity: supportedEntitySchema,
    getEntitledFunctionListReq: {
        '1.0.0': getEntitledFunctionListReqSchema
    },
    checkEntitlementReq: {
        '1.0.0': checkEntitlementReqSchema
    }
};

export default requestContractSchema;
