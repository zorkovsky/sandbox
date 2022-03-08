import joi from 'joi';

import {
    entityTypeSchema,
    requestorIdentitySchema,
    filteringSchema,
    definitionVersionSchema
} from '../commonElementSchemas';

import {
    partyIdentifierSchema
} from '../model/partyBasicInfoSchemas';

import {
    registryCompanySpecificationSchema,
    registryPersonSpecificationSchema
} from '../model/companyRegistrySchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('getCompanyRegistryListReq', 'readCompanyRegistryReq', 'getCompanyRegistryExecutiveListReq',
        'getCompanyRegistryOwnerListReq', 'readCompanyRegistryPersonDetailReq'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'getCompanyRegistryListReq', then: joi.valid('1.0.0')},
                {is: 'readCompanyRegistryReq', then: joi.valid('1.0.0')},
                {is: 'getCompanyRegistryExecutiveListReq', then: joi.valid('1.0.0')},
                {is: 'getCompanyRegistryOwnerListReq', then: joi.valid('1.0.0')},
                {is: 'readCompanyRegistryPersonDetailReq', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const getCompanyRegistryListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    filtering: filteringSchema.required()
});

const readCompanyRegistryReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    companyIdentifier: partyIdentifierSchema.required()
});

const getCompanyRegistryExecutiveListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    registryCompanySpecification: registryCompanySpecificationSchema.required()
});

const getCompanyRegistryOwnerListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    registryCompanySpecification: registryCompanySpecificationSchema.required()
});

const readCompanyRegistryPersonDetailReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    registryPersonSpecification: registryPersonSpecificationSchema.required()
});

const requestCompanyRegistrySchema = {
    supportedEntity: supportedEntitySchema,
    getCompanyRegistryListReq: {
        '1.0.0': getCompanyRegistryListReqSchema
    },
    readCompanyRegistryReq: {
        '1.0.0': readCompanyRegistryReqSchema
    },
    getCompanyRegistryExecutiveListReq: {
        '1.0.0': getCompanyRegistryExecutiveListReqSchema
    },
    getCompanyRegistryOwnerListReq: {
        '1.0.0': getCompanyRegistryOwnerListReqSchema
    },
    readCompanyRegistryPersonDetailReq: {
        '1.0.0': readCompanyRegistryPersonDetailReqSchema
    }
};

export default requestCompanyRegistrySchema;
