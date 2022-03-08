import joi from 'joi';

import {
    modelCompanyRegistrySchema,
    executiveBasicRegistryDataSchema,
    ownerBasicRegistryDataSchema,
    registryPersonDetailSchema
} from '../model/companyRegistrySchemas';

const registryCompanyBasicInfoSchema = modelCompanyRegistrySchema.registryCompanyBasicInfoSchema['1.0.0'];
const registryCompanyExtendedInfoSchema = modelCompanyRegistrySchema.registryCompanyExtendedInfoSchema['1.0.0'];

import {
    entityTypeSchema,
    definitionVersionSchema,
    returnedItemsSchema
} from '../commonElementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('getCompanyRegistryListRes', 'readCompanyRegistryRes', 'getCompanyRegistryExecutiveListRes',
        'getCompanyRegistryOwnerListRes', 'readCompanyRegistryPersonDetailRes'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'getCompanyRegistryListRes', then: joi.valid('1.0.0')},
                {is: 'readCompanyRegistryRes', then: joi.valid('1.0.0')},
                {is: 'getCompanyRegistryExecutiveListRes', then: joi.valid('1.0.0')},
                {is: 'getCompanyRegistryOwnerListRes', then: joi.valid('1.0.0')},
                {is: 'readCompanyRegistryPersonDetailRes', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const getCompanyRegistryListResSchema = joi.object({
    returnedItems: returnedItemsSchema.required(),
    entityList: joi.array().items(registryCompanyBasicInfoSchema)
});

const readCompanyRegistryResSchema = joi.object({
    entityData: registryCompanyExtendedInfoSchema.required()
});

const getCompanyRegistryExecutiveListResSchema = joi.object({
    returnedItems: returnedItemsSchema.required(),
    entityList: joi.array().items(executiveBasicRegistryDataSchema)
});

const getCompanyRegistryOwnerListResSchema = joi.object({
    returnedItems: returnedItemsSchema.required(),
    entityList: joi.array().items(ownerBasicRegistryDataSchema)
});

const readCompanyRegistryPersonDetailResSchema = joi.object({
    entityData: registryPersonDetailSchema.required()
});

const responseCompanyRegistrySchema = {
    supportedEntity: supportedEntitySchema,
    getCompanyRegistryListRes: {
        '1.0.0': getCompanyRegistryListResSchema
    },
    readCompanyRegistryRes: {
        '1.0.0': readCompanyRegistryResSchema
    },
    getCompanyRegistryExecutiveListRes: {
        '1.0.0': getCompanyRegistryExecutiveListResSchema
    },
    getCompanyRegistryOwnerListRes: {
        '1.0.0': getCompanyRegistryOwnerListResSchema
    },
    readCompanyRegistryPersonDetailRes: {
        '1.0.0': readCompanyRegistryPersonDetailResSchema
    }
};

export default responseCompanyRegistrySchema;
