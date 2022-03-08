import joi from 'joi';

import {
    partyIdentifierSchema,
    companyBasicInfoSchema,
    sexSSchema,
    personBasicInfoSchema
} from './partyBasicInfoSchemas';

import {
    streetSchema,
    streetNoSchema,    
    houseNoSchema,    
    flatNoSchema,    
    cityPartSchema,    
    citySchema,    
    higherAdminUnitSchema,    
    zipCodeSchema,
    countrySSchema
} from './contactSchemas';

import {
    entityTypeSchema,
    definitionVersionSchema
} from '../commonElementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('registryCompanyBasicInfoSchema', 'registryCompanyExtendedInfoSchema', 'registryCompanyRelPersonsSchema'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'registryCompanyBasicInfoSchema', then: joi.valid('1.0.0')},
                {is: 'registryCompanyExtendedInfoSchema', then: joi.valid('1.0.0')},
                {is: 'registryCompanyRelPersonsSchema', then: joi.valid('1.0.0')}
            ]
        }
    )
});

export const addressDetailRegSchema = joi.object({
    street: streetSchema,
    streetNo: streetNoSchema,
    houseNo: houseNoSchema,
    flatNo: flatNoSchema,
    cityPart: cityPartSchema,
    city: citySchema,
    higherAdminUnit: higherAdminUnitSchema,
    country: countrySSchema,
    zipCode: zipCodeSchema
});

const registryCompanyBasicInfoSchema = joi.object({
    companyBasicInfo: companyBasicInfoSchema.required(),
    companyIdentifier: partyIdentifierSchema.required(),
    companyAddress: addressDetailRegSchema
});

const registryIdSchema = joi.string();

const registryNameSchema = joi.string();

const registryBirthDateSchema = joi.string().pattern(new RegExp(/^(19|20)\d\d([-])(((0[13578]|1[02])\2(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)\2(0[1-9]|[12][0-9]|30))|((02)\2(0[1-9]|[12][0-9])))$/i));

const registryPersonBasicInfoSchema = joi.object({
    registryId: registryIdSchema.required(),
    registryName: registryNameSchema.required(),
    birthDate: registryBirthDateSchema
});

const registryCompanyExtendedInfoSchema = joi.object({
    companyBasicInfo: companyBasicInfoSchema.required(),
    companyIdentifiers: joi.array().items(partyIdentifierSchema).required().min(1),
    companyAddress: addressDetailRegSchema
});

const companyRoleIdSchema = joi.number().integer();

const companyRoleSchema = joi.string();

const companyFunctionSchema = joi.string();

const validitySchema = joi.string().pattern(new RegExp(/^(19|20)\d\d([-])(((0[13578]|1[02])\2(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)\2(0[1-9]|[12][0-9]|30))|((02)\2(0[1-9]|[12][0-9])))$/i));

export const registryCompanySpecificationSchema = joi.object({
    companyCountry: countrySSchema.required(),
    companyIdentifier: partyIdentifierSchema.required()
});

export const executiveBasicRegistryDataSchema = joi.object({
    registryPersonId: registryIdSchema,
    registryName: registryNameSchema.required(),
    sex: sexSSchema,
    birthDate: registryBirthDateSchema.required(),
    country: countrySSchema,
    registryCompanyId: registryIdSchema.required(),
    companyRoleId: companyRoleIdSchema.required(),
    companyRole: companyRoleSchema,
    companyFunction: companyFunctionSchema,
    validFrom: validitySchema,
    validTo: validitySchema
});

const shareSchema = joi.number();

const paidUpSchema = joi.number();

const capitalSchema = joi.number();

const ownersTracePathSchema = joi.string();

const shareDetailSchema = joi.object({
    ownersTracePath: ownersTracePathSchema,
    registryCompanyId: registryIdSchema.required(),
    companyRoleId: companyRoleIdSchema.required(),
    companyRole: companyRoleSchema,
    companyFunction: companyFunctionSchema,
    share: shareSchema,
    paidUp: paidUpSchema,
    capital: capitalSchema,
    validFrom: validitySchema,
    validTo: validitySchema
});

export const ownerBasicRegistryDataSchema = joi.object({
    registryPersonId: registryIdSchema.required(),
    registryName: registryNameSchema.required(),
    sex: sexSSchema,
    birthDate: registryBirthDateSchema.required(),
    country: countrySSchema,
    totalShare: shareSchema,
    shareDetails: joi.array().items(shareDetailSchema)
});

export const registryPersonSpecificationSchema = joi.object({
    registryPersonId: registryIdSchema.required(),
    registryName: registryNameSchema.required(),
    birthDate: registryBirthDateSchema.required()
});

export const registryPersonDetailSchema = joi.object({
    personBasicInfo: personBasicInfoSchema.required(),
    personIdentifiers: joi.array().items(partyIdentifierSchema).required().min(1),
    personAddress: addressDetailRegSchema
});

export const modelCompanyRegistrySchema = {
    supportedEntity: supportedEntitySchema,
    registryCompanyBasicInfoSchema: {
        '1.0.0': registryCompanyBasicInfoSchema
    },
    registryCompanyExtendedInfoSchema: {
        '1.0.0': registryCompanyExtendedInfoSchema
    },
    registryPersonBasicInfoSchema: {
        '1.0.0': registryPersonBasicInfoSchema
    }
};

export default modelCompanyRegistrySchema;
