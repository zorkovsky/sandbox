import joi from 'joi';

import {
    entitlementTemplateTypes,
    entitlementUsageTypes
} from '../enumerations';

import {
    documentHeaderSchema,
    auditInfoSchema,
    elementHeaderSchema,
    entityTypeSchema,
    definitionVersionSchema,
    partyRoleTypeSSchema,
    userRoleTypeSSchema,
    userNameSchema,
    functionNameSchema,
    uuidSchema
} from '../commonElementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('entitlementTemplateDocumentSchema'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'entitlementTemplateDocumentSchema', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const templateTypeESchema = joi.string().valid(
    ...entitlementTemplateTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const templateTypeSSchema = templateTypeESchema.valid(
    ...entitlementTemplateTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

const usageTypeESchema = joi.string().valid(
    ...entitlementUsageTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const usageTypeSSchema = usageTypeESchema.valid(
    ...entitlementUsageTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const entitledUserHSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    userName: userNameSchema,
    userId: uuidSchema.required(),
    userRoleTypes: joi.array().items(userRoleTypeSSchema).required().min(1)
});

const functionSpecificationSchema = joi.object();

const entitledFunctionDetailHSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    functionName: functionNameSchema.required(),
    functionSpecification: functionSpecificationSchema
});

const entitlementTemplateSchema = joi.object({
    usageType: usageTypeSSchema.required(),
    templateType: templateTypeSSchema.required(),
    partyRoleType: partyRoleTypeSSchema,
    userRoleType: userRoleTypeSSchema,
    entitledFunctions: joi.array().items(entitledFunctionDetailHSchema)
}).xor('partyRoleType', 'userRoleType');

const entitlementTemplateDocumentSchema = joi.object({
    documentHeader: documentHeaderSchema.required(),
    auditInfo: auditInfoSchema.required(),
    documentData: entitlementTemplateSchema.required()
});

const modelContractSchema = {
    supportedEntity: supportedEntitySchema,
    entitlementTemplateDocumentSchema: {
        '1.0.0': entitlementTemplateDocumentSchema
    }
};

export default modelContractSchema;
