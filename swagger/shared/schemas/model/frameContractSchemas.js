import joi from 'joi';

import {
    clientTypes,
    contractualDocumentBusinessStates,
    contractualDocumentTypes,
    relatedPersonRoleTypes,
    signatureMethods,
    accessLevels
} from '../enumerations';

import {
    partyRoleReferenceSSchema,
    documentHeaderSchema,
    auditInfoSchema,
    elementHeaderSchema,
    elementIdentifierHSchema,
    dataSourceSchema,
    entityTypeSchema,
    definitionVersionSchema
} from '../commonElementSchemas';

import {
    personBasicInfoSchema,
    personBasicInfoFilledInSchema,
    companyBasicInfoSchema,
    companyBasicInfoFilledInSchema,
    partyIdentifierHSchema,
    partyAttachmentHSchema,
    pepInfoSchema,
    pepInfoFilledInSchema,
    additionalClientInfoSchema,
    additionalClientInfoFilledInSchema
} from './partyBasicInfoSchemas';

import {
    partyContactHSchema,
    partyContactFilledInSchema,
    emailSchema,
    phoneSchema
} from './contactSchemas';

import {
    entitledUserHSchema
} from './entitlementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('frameContractEntitySchema', 'contractualDocumentDocumentSchema', 'contractExecutiveSchema', 'contractOwnerSchema',
        'contractAuthorizedSchema', 'frameContractDocumentForSubmitSchema'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'frameContractEntitySchema', then: joi.valid('1.0.0')},
                {is: 'contractualDocumentDocumentSchema', then: joi.valid('1.0.0')},
                {is: 'contractExecutiveSchema', then: joi.valid('1.0.0')},
                {is: 'contractOwnerSchema', then: joi.valid('1.0.0')},
                {is: 'contractAuthorizedSchema', then: joi.valid('1.0.0')},
                {is: 'frameContractDocumentForSubmitSchema', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const clientTypeESchema = joi.string().valid(
    ...clientTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const clientTypeSSchema = clientTypeESchema.valid(
    ...clientTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

const contractClientInfoSchema = joi.object({
    clientType: clientTypeSSchema.required(),
    personBasicInfo: joi.when(
        'clientType',
        {
            is: 'Person',
            then: personBasicInfoSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    companyBasicInfo: joi.when(
        'clientType',
        {
            is: 'Company',
            then: companyBasicInfoSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    additionalClientInfo: additionalClientInfoSchema,
    partyIdentifiers: joi.array().items(partyIdentifierHSchema).required().min(1),
    partyContacts: joi.array().items(partyContactHSchema),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    pepInfo: pepInfoSchema
});

const contractualDocumentBusinessStateESchema = joi.string().valid(
    ...contractualDocumentBusinessStates.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const contractualDocumentBusinessStateSSchema = contractualDocumentBusinessStateESchema.valid(
    ...contractualDocumentBusinessStates.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);
    
export const frameContractEntitySchema = joi.object({
    clientInfo: contractClientInfoSchema.required(),
    clientPartyRoleReference: partyRoleReferenceSSchema,
    businessState: contractualDocumentBusinessStateSSchema.required()
});

const contractualDocumentTypeESchema = joi.string().valid(
    ...contractualDocumentTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const contractualDocumentTypeSSchema = contractualDocumentTypeESchema.valid(
    ...contractualDocumentTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const jobPositionSchema = joi.string();

export const companyExecutiveInfoSchema = joi.object({
    jobPosition: jobPositionSchema,
    authenticationEmail: emailSchema,
    authenticationPhone: phoneSchema,
    dataSource: dataSourceSchema.required()
});

export const companyExecutiveInfoFilledInSchema = joi.object({
    jobPosition: jobPositionSchema.required(),
    authenticationEmail: emailSchema.required(),
    authenticationPhone: phoneSchema.required(),
    dataSource: dataSourceSchema.required()
});

const signatureMethodESchema = joi.string().valid(
    ...signatureMethods.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const signatureMethodSSchema = signatureMethodESchema.valid(
    ...signatureMethods.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const signatureRulesReqSchema = joi.object({
    signatureMethod: signatureMethodESchema.required().allow(null)
}).min(1);

export const signatureRulesSchema = joi.object({
    signatureMethod: signatureMethodSSchema,
    dataSource: dataSourceSchema.required()
});

export const no25pctOwnerSchema = joi.boolean();

export const ownersDisclaimerReqSchema = joi.object({
    no25pctOwner: no25pctOwnerSchema.required().allow(null)
}).min(1);

export const ownersDisclaimerSchema = joi.object({
    no25pctOwner: no25pctOwnerSchema
});

const ownerShareSchema = joi.number();

export const ownerAdditionalInfoSchema = joi.string();

export const companyOwnerInfoReqSchema = joi.object({
    ownerShare: ownerShareSchema,
    additionalInfo: ownerAdditionalInfoSchema
}).min(1);

export const companyOwnerInfoUpdReqSchema = joi.object({
    ownerShare: ownerShareSchema.allow(null),
    additionalInfo: ownerAdditionalInfoSchema.allow(null)
}).min(1);

export const companyOwnerInfoSchema = companyOwnerInfoReqSchema.keys({
    dataSource: dataSourceSchema.required()
});

export const companyOwnerInfoFilledInSchema = companyOwnerInfoReqSchema.keys({
    ownerShare: ownerShareSchema.required(),
    additionalInfo: ownerAdditionalInfoSchema.required(),
    dataSource: dataSourceSchema.required()
});

const accessLevelESchema = joi.string().valid(
    ...accessLevels.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const accessLevelSSchema = accessLevelESchema.valid(
    ...accessLevels.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const authorizedPersonInfoReqSchema = joi.object({
    accessLevel: accessLevelESchema
}).min(1);

export const authorizedPersonInfoUpdReqSchema = joi.object({
    accessLevel: accessLevelESchema.allow(null)
}).min(1);

export const authorizedPersonInfoSchema = joi.object({
    accessLevel: accessLevelSSchema,
    dataSource: dataSourceSchema.required()
});

export const authorizedPersonInfoFilledInSchema = joi.object({
    accessLevel: accessLevelSSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const authenticationDataReqSchema = joi.object({
    authenticationEmail: emailSchema,
    authenticationPhone: phoneSchema
}).min(1);

export const authenticationDataUpdReqSchema = joi.object({
    authenticationEmail: emailSchema.allow(null),
    authenticationPhone: phoneSchema.allow(null)
}).min(1);

export const authenticationDataSchema = authenticationDataReqSchema.keys({
    dataSource: dataSourceSchema.required()
});

export const authenticationDataFilledInSchema = joi.object({
    authenticationEmail: emailSchema.required(),
    authenticationPhone: phoneSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const clientRelationInfoReqSchema = joi.object({
    jobPosition: jobPositionSchema.required()
}).min(1);

export const clientRelationInfoUpdReqSchema = joi.object({
    jobPosition: jobPositionSchema.required().allow(null)
}).min(1);

export const clientRelationInfoSchema = joi.object({
    jobPosition: jobPositionSchema,
    dataSource: dataSourceSchema.required()
});

export const clientRelationInfoFilledInSchema = joi.object({
    jobPosition: jobPositionSchema.required(),
    dataSource: dataSourceSchema.required()
});

const relatedPersonRoleTypeESchema = joi.string().valid(
    ...relatedPersonRoleTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
const relatedPersonRoleTypeSSchema = relatedPersonRoleTypeESchema.valid(
    ...relatedPersonRoleTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

const relatedPersonRoleSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    relatedPersonRoleType: relatedPersonRoleTypeSSchema.required(),
    companyOwnerInfo: companyOwnerInfoSchema,
    authorizedPersonInfo: authorizedPersonInfoSchema,
    roleIdentifiers: joi.array().items(elementIdentifierHSchema),
    roleContacts: joi.array().items(elementIdentifierHSchema),
    roleDocuments: joi.array().items(elementIdentifierHSchema),
    partyRoleReference: partyRoleReferenceSSchema
});

const contractRelatedPersonHSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    personBasicInfo: personBasicInfoSchema.required(),
    partyIdentifiers: joi.array().items(partyIdentifierHSchema),
    partyContacts: joi.array().items(partyContactHSchema),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    authenticationData: authenticationDataSchema,
    clientRelationInfo: clientRelationInfoSchema,
    pepInfo: pepInfoSchema,
    relatedPersonRoles: joi.array().items(relatedPersonRoleSchema).required().min(1)
});

const contractualDocumentSchema = joi.object({
    contractualDocumentType: contractualDocumentTypeSSchema.required(),
    clientInfo: contractClientInfoSchema,
    signatureRules: signatureRulesSchema,
    no25pctOwner: no25pctOwnerSchema,
    contractRelatedPersons: joi.array().items(contractRelatedPersonHSchema),
    clientPartyRoleReference: partyRoleReferenceSSchema,
    businessState: contractualDocumentBusinessStateSSchema.required(),
    entitledUsers: joi.array().items(entitledUserHSchema)
});

const contractualDocumentDocumentSchema = joi.object({
    documentHeader: documentHeaderSchema.required(),
    auditInfo: auditInfoSchema.required(),
    documentData: contractualDocumentSchema.required()
});

const applicationCreatorSchema = joi.boolean();

export const contractExecutiveSchema = joi.object({
    personBasicInfo: personBasicInfoSchema.required(),
    partyIdentifiers: joi.array().items(partyIdentifierHSchema),
    partyContacts: joi.array().items(partyContactHSchema),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    authenticationData: authenticationDataSchema,
    clientRelationInfo: clientRelationInfoSchema,
    pepInfo: pepInfoSchema,
    partyRoleReference: partyRoleReferenceSSchema,
    applicationCreator: applicationCreatorSchema
});

export const contractExecutiveHSchema = contractExecutiveSchema.keys({
    elementHeader: elementHeaderSchema.required()
});

export const contractOwnerSchema = joi.object({
    personBasicInfo: personBasicInfoSchema.required(),
    partyIdentifiers: joi.array().items(partyIdentifierHSchema),
    partyContacts: joi.array().items(partyContactHSchema),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    pepInfo: pepInfoSchema,
    companyOwnerInfo: companyOwnerInfoSchema,
    partyRoleReference: partyRoleReferenceSSchema
});

export const contractOwnerHSchema = contractOwnerSchema.keys({
    elementHeader: elementHeaderSchema.required()
});

export const contractAuthorizedSchema = joi.object({
    personBasicInfo: personBasicInfoSchema.required(),
    partyIdentifiers: joi.array().items(partyIdentifierHSchema),
    partyContacts: joi.array().items(partyContactHSchema),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    authenticationData: authenticationDataSchema,
    clientRelationInfo: clientRelationInfoSchema,
    pepInfo: pepInfoSchema,
    authorizedPersonInfo: authorizedPersonInfoSchema,
    partyRoleReference: partyRoleReferenceSSchema
});

export const contractAuthorizedHSchema = contractAuthorizedSchema.keys({
    elementHeader: elementHeaderSchema.required()
});

export const updateExecAuthorizationSchema = joi.object({
    personBasicInfo: personBasicInfoSchema.required(),
    authorizedPersonInfo: authorizedPersonInfoSchema,
    partyRoleReference: partyRoleReferenceSSchema
});

// Joi schemas for v Frame Document validation before its submit

const contractClientInfoFCSSchema = joi.object({
    clientType: clientTypeSSchema.required().valid(joi.override, 'Company'),
    companyBasicInfo: companyBasicInfoFilledInSchema.required(),
    additionalClientInfo: additionalClientInfoFilledInSchema.required(),
    partyIdentifiers: joi.array().items(partyIdentifierHSchema).required().min(1),
    partyContacts: joi.array().items(partyContactFilledInSchema).required().min(1),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    pepInfo: pepInfoFilledInSchema.required()
});

const signatureRulesFCSSchema = joi.object({
    signatureMethod: signatureMethodSSchema.required(),
    dataSource: dataSourceSchema.required()
});

const relatedPersonRoleFCSSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    relatedPersonRoleType: relatedPersonRoleTypeSSchema.required(),
    companyOwnerInfo: joi.when(
        'relatedPersonRoleType',
        {
            is: 'CompanyOwner',
            then: companyOwnerInfoFilledInSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    authorizedPersonInfo: joi.when(
        'relatedPersonRoleType',
        {
            is: 'AuthorizedPerson',
            then: authorizedPersonInfoFilledInSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    roleIdentifiers: joi.array().items(elementIdentifierHSchema),
    roleContacts: joi.array().items(elementIdentifierHSchema),
    roleDocuments: joi.array().items(elementIdentifierHSchema),
    partyRoleReference: partyRoleReferenceSSchema
});

const contractRelatedPersonFCSSchema = joi.object({
    elementHeader: elementHeaderSchema.required(),
    personBasicInfo: personBasicInfoFilledInSchema.required(),
    partyIdentifiers: joi.array().items(partyIdentifierHSchema),
    partyContacts: joi.array().items(partyContactFilledInSchema),
    partyDocuments: joi.array().items(partyAttachmentHSchema),
    authenticationData: authenticationDataFilledInSchema,
    clientRelationInfo: clientRelationInfoFilledInSchema,
    pepInfo: pepInfoFilledInSchema.required(),
    relatedPersonRoles: joi.array().items(relatedPersonRoleFCSSchema).required().min(1)
});

const frameContractForSubmitSchema = joi.object({
    contractualDocumentType: contractualDocumentTypeSSchema.required().valid(joi.override, 'FrameContract'),
    clientInfo: contractClientInfoFCSSchema.required(),
    signatureRules: signatureRulesFCSSchema.required(),
    no25pctOwner: no25pctOwnerSchema,
    contractRelatedPersons: joi.array().items(contractRelatedPersonFCSSchema).required().min(1),
    clientPartyRoleReference: partyRoleReferenceSSchema,
    businessState: contractualDocumentBusinessStateSSchema.required().valid(joi.override, 'PreparationByClient'),
    entitledUsers: joi.array().items(entitledUserHSchema)
});

export const frameContractDocumentForSubmitSchema = joi.object({
    documentHeader: documentHeaderSchema.required(),
    auditInfo: auditInfoSchema.required(),
    documentData: frameContractForSubmitSchema.required()
});

const modelContractSchema = {
    supportedEntity: supportedEntitySchema,
    frameContractEntitySchema: {
        '1.0.0': frameContractEntitySchema
    },
    contractualDocumentDocumentSchema: {
        '1.0.0': contractualDocumentDocumentSchema
    },
    contractExecutiveSchema: {
        '1.0.0': contractExecutiveSchema
    },
    contractOwnerSchema: {
        '1.0.0': contractOwnerSchema
    },
    contractAuthorizedSchema: {
        '1.0.0': contractAuthorizedSchema
    },
    frameContractDocumentForSubmitSchema: {
        '1.0.0': frameContractDocumentForSubmitSchema
    }
};

export default modelContractSchema;
