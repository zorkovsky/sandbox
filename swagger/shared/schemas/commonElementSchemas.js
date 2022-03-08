import joi from 'joi';

import {
    documentTypes,
    entityTypes,
    entityCategories,
    technicalStates,
    userRoleTypes,
    partyRoleTypes,
    sortingOrders,
    authorizationFactorTypes,
    dataSources,
    functionNames
} from './enumerations';

// Schemas for general data types
export const entityTypeSchema = joi.string().valid(
    ...entityTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);

export const documentTypeSchema = joi.string().valid(
    ...documentTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);

export const definitionVersionSchema = joi.string().pattern(new RegExp(/^(\d+\.)(\d+\.)(\d+)$/));
// UUID v. 4
export const uuidSchema = joi.string().pattern(new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i));
export const entityCategorySchema = joi.string().valid(
    ...entityCategories.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const technicalStateSchema = entityCategorySchema.valid(
    ...technicalStates.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const dataVersionSchema = joi.date().iso();
export const timestampSchema = joi.number();

export const partyRoleTypeESchema = joi.string().valid(
    ...partyRoleTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const partyRoleTypeSSchema = partyRoleTypeESchema.valid(
    ...partyRoleTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const partyRoleReferenceESchema = joi.object({
    partyId: uuidSchema.required(),
    partyRoleId: uuidSchema.required(),
    partyRoleType: partyRoleTypeESchema.required()
});

export const partyRoleReferenceSSchema = joi.object({
    partyId: uuidSchema.required(),
    partyRoleId: uuidSchema.required(),
    partyRoleType: partyRoleTypeSSchema.required()
});

export const userNameSchema = joi.string();

export const userRoleTypeESchema = joi.string().valid(
    ...userRoleTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const userRoleTypeSSchema = userRoleTypeESchema.valid(
    ...userRoleTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const userReferenceESchema = joi.object({
    userName: userNameSchema.required(),
    userRoleType: userRoleTypeESchema.default(userRoleTypes.enumHeader.defaultValue)
});
export const userReferenceSSchema = joi.object({
    userName: userNameSchema.required(),
    userRoleType: userRoleTypeSSchema.default(userRoleTypes.enumHeader.defaultValue)
});

export const serviceCallInitiatorESchema = joi.object({
    partyRoleReference: partyRoleReferenceESchema,
    userReference: userReferenceESchema
}).xor('partyRoleReference', 'userReference');
export const serviceCallInitiatorSSchema = joi.object({
    partyRoleReference: partyRoleReferenceSSchema,
    userReference: userReferenceSSchema
}).xor('partyRoleReference', 'userReference');

export const elementHeaderSchema = joi.object({
    id: uuidSchema.required(),
    definitionVersion: definitionVersionSchema.required(),
    technicalState: technicalStateSchema.required()
});

export const auditInfoSchema = joi.object({
    createdWhen: dataVersionSchema.required(),
    createdBy: serviceCallInitiatorSSchema.required(),
    modifiedWhen: dataVersionSchema.required(),
    modifiedBy: serviceCallInitiatorSSchema.required()
});

export const documentHeaderSchema = joi.object({
    documentType: documentTypeSchema.required(),
    documentCategory: entityCategorySchema.required(),
    definitionVersion: definitionVersionSchema.required(),
    technicalState: technicalStateSchema.required()
});

export const functionNameSchema = joi.string().valid(
    ...functionNames.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const changeInfoSchema = joi.object({
    modifiedWhen: dataVersionSchema.required(),
    modifiedBy: serviceCallInitiatorSSchema.required(),
    serviceName: functionNameSchema.required(),
    serviceCallId: uuidSchema.required(),
    requestId: uuidSchema
});

export const etagSchema = joi.string();

export const entityHeaderSchema = joi.object({
    id: uuidSchema.required(),
    entityType: entityTypeSchema.required(),
    entityCategory: entityCategorySchema.required(),
    definitionVersion: definitionVersionSchema.required(),
    technicalState: technicalStateSchema.required(),
    _ts: timestampSchema.required(),
    _etag: etagSchema.required()
});

export const requestorIdentitySchema = joi.object({
    requestor: serviceCallInitiatorESchema.required(),
    onBehalfOf: serviceCallInitiatorESchema
});

export const filteringAttributeNameSchema = joi.string();

export const filteringAttributeValueSchema = joi.string();

export const filteringConditionSchema = joi.object({
    filteringAttribute: filteringAttributeNameSchema.required(),
    attributeValue: filteringAttributeValueSchema.required()
});

export const filteringSchema = joi.array().items(filteringConditionSchema).required().min(1);

export const startWithSchema = joi.number().integer().default(0);

export const pageSizeSchema = joi.number().integer().default(20);

export const pagingSchema = joi.object({
    startWith: startWithSchema,
    pageSize: pageSizeSchema
});

export const returnedItemsSchema = joi.number().integer();

export const isEndOfListSchema = joi.boolean();

export const pagingResponseSchema = joi.object({
    returnedItems: returnedItemsSchema.required(),
    isEndOfList: isEndOfListSchema.required()
});

export const sortingAttributeNameSchema = joi.string();

export const orderSchema = joi.string().valid(
    ...sortingOrders.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);

export const sortingAttributeSchema = joi.object({
    attributeName: sortingAttributeNameSchema.required(),
    order: orderSchema
});

export const sortingSchema = joi.array().items(sortingAttributeSchema).required().min(1);

export const authorizationFactorTypeESchema = joi.string().valid(
    ...authorizationFactorTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const authorizationFactorTypeSSchema = authorizationFactorTypeESchema.valid(
    ...authorizationFactorTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const authorizationSchema = joi.object({
    authorizedBy: serviceCallInitiatorSSchema.required(),
    userSessionId: uuidSchema.required(),
    authorizationFactorType: authorizationFactorTypeSSchema,
    authorizationFactorId: uuidSchema,
    authorizationId: uuidSchema
});

export const dataSourceESchema = joi.string().valid(
    ...dataSources.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const dataSourceSchema = dataSourceESchema.valid(
    ...dataSources.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const elementIdentifierHSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    refElementId: uuidSchema.required()
});

export const entityReferenceSchema = joi.object({
    entityType: entityTypeSchema.required(),
    entityId: uuidSchema.required()
});
