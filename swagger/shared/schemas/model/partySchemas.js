import joi from 'joi';

import {
    partyTypes,
    partyRoleRelationTypes
} from '../enumerations';

import {
    entityTypeSchema,
    definitionVersionSchema,
    documentHeaderSchema,
    auditInfoSchema,
    elementHeaderSchema,
    elementIdentifierHSchema,
    partyRoleReferenceSSchema,
    partyRoleTypeSSchema
} from '../commonElementSchemas';

import {
    personBasicInfoSchema,
    companyBasicInfoSchema,
    orgUnitBasicInfoSchema,
    systemBasicInfoSchema,
    additionalClientInfoSchema,
    partyIdentifierHSchema,
    partyAttachmentHSchema,
    pepInfoSchema
} from './partyBasicInfoSchemas';

import {
    partyContactHSchema
} from './contactSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('partyDocumentSchema'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'partyDocumentSchema', then: joi.valid('1.0.0')}
            ]
        }
    )
});

export const partyTypeESchema = joi.string().valid(
    ...partyTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const partyTypeSSchema = partyTypeESchema.valid(
    ...partyTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

const partyNameSchema = joi.string();

const partyRoleRelationTypeESchema = joi.string().valid(
    ...partyRoleRelationTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const partyRoleRelationTypeSSchema = partyRoleRelationTypeESchema.valid(
    ...partyRoleRelationTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

const partyRoleRelationHSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    relationType: partyRoleRelationTypeSSchema.required(),
    masterPartyRole: partyRoleReferenceSSchema.required()
});

const partyRoleHSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    partyRoleType: partyRoleTypeSSchema.required(),
    partyRoleIdentifiers: joi.array().items(elementIdentifierHSchema).required().min(1),
    partyRoleContacts: joi.array().items(elementIdentifierHSchema),
    partyRoleDocuments: joi.array().items(elementIdentifierHSchema),
    partyRoleRelations: joi.array().items(partyRoleRelationHSchema)
});

const partySchema = joi.object({
    partyType: partyTypeSSchema.required(),
    partyName: partyNameSchema.required(),
    personBasicInfo: joi.when(
        'partyType',
        {
            is: 'Person',
            then: personBasicInfoSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    companyBasicInfo: joi.when(
        'partyType',
        {
            is: 'Company',
            then: companyBasicInfoSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    orgUnitBasicInfo: joi.when(
        'partyType',
        {
            is: 'OrgUnit',
            then: orgUnitBasicInfoSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    systemBasicInfo: joi.when(
        'partyType',
        {
            is: 'System',
            then: systemBasicInfoSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    additionalClientInfo: additionalClientInfoSchema,
    partyIdentifiers: joi.array().items(partyIdentifierHSchema).required().min(1),
    partyContacts: joi.array().items(partyContactHSchema),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    partyRoles: joi.array().items(partyRoleHSchema).required().min(1),
    pepInfo: pepInfoSchema
});

const partyDocumentSchema = joi.object({
    documentHeader: documentHeaderSchema.required(),
    auditInfo: auditInfoSchema.required(),
    documentData: partySchema.required()
});

const modelContractSchema = {
    supportedEntity: supportedEntitySchema,
    partyDocumentSchema: {
        '1.0.0': partyDocumentSchema
    }
};

export default modelContractSchema;
