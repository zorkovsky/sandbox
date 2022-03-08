import joi from 'joi';

import {
    entityTypeSchema,
    entityHeaderSchema,
    definitionVersionSchema,
    pagingResponseSchema,
    functionNameSchema
} from '../commonElementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('getEntitledFunctionListRes', 'checkEntitlementRes'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'getEntitledFunctionListRes', then: joi.valid('1.0.0')},
                {is: 'checkEntitlementRes', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const entitledFunctionHSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    functionName: functionNameSchema.required()
});

const getEntitledFunctionListResSchema = joi.object({
    entityList: joi.array().items(entitledFunctionHSchema),
    pagingResponse: pagingResponseSchema.required()
});

const checkEntitlementResSchema = joi.object({
    checkResult: joi.boolean().required()
});

const responseContractSchema = {
    supportedEntity: supportedEntitySchema,
    getEntitledFunctionListRes: {
        '1.0.0': getEntitledFunctionListResSchema
    },
    checkEntitlementRes: {
        '1.0.0': checkEntitlementResSchema
    }
};

export default responseContractSchema;
