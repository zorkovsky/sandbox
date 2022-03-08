import joi from 'joi';
import {
    registryPersonSpecificationSchema
} from '../model/companyRegistrySchemas';

import {
    companyOwnerInfoReqSchema,
    companyOwnerInfoUpdReqSchema,
    authorizedPersonInfoReqSchema,
    authorizedPersonInfoUpdReqSchema,
    jobPositionSchema,
    signatureRulesReqSchema,
    ownersDisclaimerReqSchema,
    authenticationDataReqSchema,
    authenticationDataUpdReqSchema,
    clientRelationInfoReqSchema,
    clientRelationInfoUpdReqSchema
} from '../model/frameContractSchemas';

import {
    partyIdentifierSchema,
    companyBasicInfoUpdReqSchema,
    additionalClientInfoUpdReqSchema,
    pepInfoReqSchema,
    pepInfoUpdReqSchema,
    partyAttachmentReqSchema,
    personBasicInfoReqSchema,
    personBasicInfoUpdReqSchema
} from '../model/partyBasicInfoSchemas';

import {
    entityTypeSchema,
    requestorIdentitySchema,
    definitionVersionSchema,
    uuidSchema,
    timestampSchema,
    etagSchema,
    filteringSchema,
    pagingSchema,
    sortingSchema
} from '../commonElementSchemas';

import {
    addressDetailSchema,
    addressDetailUpdESchema,
    emailSchema,
    partyContactReqSchema,
    partyContactUpdReqSchema,
    phoneSchema,
    countryESchema
} from '../model/contactSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('createFrameContractReq', 'createFrameContractWoExecutiveReq',
        'readContractClientInfoReq', 'updateContractClientInfoReq', 'deleteContractReq', 'getFrameContractListReq', 'checkFrameContractBeforeSubmitReq',
        'createContractClientContactReq', 'updateContractClientContactReq', 'deleteContractClientContactReq',
        'getContractExecutiveListReq', 'createContractExecutiveReq', 'updateContractExecutiveReq', 'deleteContractExecutiveReq',
        'readSignatureRulesReq', 'updateSignatureRulesReq', 'readOwnersDisclaimerReq', 'updateOwnersDisclaimerReq',
        'getContractOwnerListReq', 'createContractOwnerReq', 'updateContractOwnerReq', 'deleteContractOwnerReq',
        'getContractAuthorizedListReq', 'createContractAuthorizedReq', 'updateContractAuthorizedReq', 'updateContractExecAuthorizationReq', 'deleteContractAuthorizedReq',
        'getContractRelPersonDocumentListReq', 'createContractRelPersonDocumentReq', 'deleteContractRelPersonDocumentReq'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'createFrameContractReq', then: joi.valid('1.0.0')},
                {is: 'createFrameContractWoExecutiveReq', then: joi.valid('1.0.0')},
                {is: 'readContractClientInfoReq', then: joi.valid('1.0.0')},
                {is: 'updateContractClientInfoReq', then: joi.valid('1.0.0')},
                {is: 'deleteContractReq', then: joi.valid('1.0.0')},
                {is: 'getFrameContractListReq', then: joi.valid('1.0.0')},
                {is: 'checkFrameContractBeforeSubmitReq', then: joi.valid('1.0.0')},
                {is: 'createContractClientContactReq', then: joi.valid('1.0.0')},
                {is: 'updateContractClientContactReq', then: joi.valid('1.0.0')},
                {is: 'deleteContractClientContactReq', then: joi.valid('1.0.0')},
                {is: 'getContractExecutiveListReq', then: joi.valid('1.0.0')},
                {is: 'createContractExecutiveReq', then: joi.valid('1.0.0')},
                {is: 'updateContractExecutiveReq', then: joi.valid('1.0.0')},
                {is: 'deleteContractExecutiveReq', then: joi.valid('1.0.0')},
                {is: 'readSignatureRulesReq', then: joi.valid('1.0.0')},
                {is: 'updateSignatureRulesReq', then: joi.valid('1.0.0')},
                {is: 'readOwnersDisclaimerReq', then: joi.valid('1.0.0')},
                {is: 'updateOwnersDisclaimerReq', then: joi.valid('1.0.0')},
                {is: 'getContractOwnerListReq', then: joi.valid('1.0.0')},
                {is: 'createContractOwnerReq', then: joi.valid('1.0.0')},
                {is: 'updateContractOwnerReq', then: joi.valid('1.0.0')},
                {is: 'deleteContractOwnerReq', then: joi.valid('1.0.0')},
                {is: 'getContractAuthorizedListReq', then: joi.valid('1.0.0')},
                {is: 'createContractAuthorizedReq', then: joi.valid('1.0.0')},
                {is: 'updateContractAuthorizedReq', then: joi.valid('1.0.0')},
                {is: 'updateContractExecAuthorizationReq', then: joi.valid('1.0.0')},
                {is: 'deleteContractAuthorizedReq', then: joi.valid('1.0.0')},
                {is: 'getContractRelPersonDocumentListReq', then: joi.valid('1.0.0')},
                {is: 'createContractRelPersonDocumentReq', then: joi.valid('1.0.0')},
                {is: 'updateContractRelPersonDocumentReq', then: joi.valid('1.0.0')},
                {is: 'deleteContractRelPersonDocumentReq', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const createFrameContractReqEntitySchema = joi.object({
    companyIdentifier: partyIdentifierSchema.required(),
    registryPersonSpecification: registryPersonSpecificationSchema.required()
});

const createFrameContractWoExecutiveReqEntitySchema = joi.object({
    companyIdentifier: partyIdentifierSchema.required()
});

const createFrameContractReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityData: createFrameContractReqEntitySchema.required()
});

const createFrameContractWoExecutiveReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityData: createFrameContractWoExecutiveReqEntitySchema.required()
});

const contractReferenceSchema = joi.object({
    contractualDocumentId: uuidSchema.required()
});

const readContractClientInfoReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const updateContractReferenceSchema = joi.object({
    contractualDocumentId: uuidSchema.required(),
    _ts: timestampSchema.required(),
    _etag: etagSchema.required()
});

const updateContractClientInfoReqEntitySchema = joi.object({
    companyBasicInfo: companyBasicInfoUpdReqSchema,
    additionalClientInfo: additionalClientInfoUpdReqSchema
}).min(1);

const updateContractClientInfoReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required(),
    entityData: updateContractClientInfoReqEntitySchema.required()
});

const deleteContractReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required()
});

const getFrameContractListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    filtering: filteringSchema.required(),
    paging: pagingSchema.required(),
    sorting: sortingSchema.required()
});

const checkFrameContractBeforeSubmitReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const createContractClientContactReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required(),
    entityData: partyContactReqSchema.required()
});

const updateContractClientContactReferenceSchema = joi.object({
    contractualDocumentId: uuidSchema.required(),
    clientContactId: uuidSchema.required(),
    _ts: timestampSchema.required(),
    _etag: etagSchema.required()
});

const updateContractClientContactReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractClientContactReferenceSchema.required(),
    entityData: partyContactUpdReqSchema.required()
});

const deleteContractClientContactReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractClientContactReferenceSchema.required()
});

const getContractExecutiveListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const updateContractPartyRoleReferenceSchema = joi.object({
    contractualDocumentId: uuidSchema.required(),
    contractRelatedPersonRoleId: uuidSchema.required(),
    _ts: timestampSchema.required(),
    _etag: etagSchema.required()
});

const createExecutiveReqSchema = joi.object({
    registryPersonSpecification: registryPersonSpecificationSchema.required()
});

const createContractExecutiveReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required(),
    entityData: createExecutiveReqSchema.required()
});

const updateExecutiveReqSchema = joi.object({
    authenticationEmail: emailSchema.allow(null),
    authenticationPhone: phoneSchema.allow(null),
    jobPosition: jobPositionSchema.allow(null),
    citizenship: countryESchema.allow(null),
    pepInfo: pepInfoUpdReqSchema
}).min(1);

const updateContractExecutiveReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyRoleReferenceSchema.required(),
    entityData: updateExecutiveReqSchema.required()
});

const deleteContractExecutiveReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyRoleReferenceSchema.required()
});

const readSignatureRulesReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const updateSignatureRulesReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required(),
    entityData: signatureRulesReqSchema.required()
});

const readOwnersDisclaimerReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const updateOwnersDisclaimerReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required(),
    entityData: ownersDisclaimerReqSchema.required()
});

const getContractOwnerListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const createOwnerReqSchema = joi.object({
    personBasicInfo: personBasicInfoReqSchema.required(),
    permanentAddress: addressDetailSchema,
    pepInfo: pepInfoReqSchema,
    companyOwnerInfo: companyOwnerInfoReqSchema
});

const createContractOwnerReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required(),
    entityData: createOwnerReqSchema.required()
});

const updateOwnerReqSchema = joi.object({
    personBasicInfo: personBasicInfoUpdReqSchema,
    permanentAddress: addressDetailUpdESchema.allow(null),
    pepInfo: pepInfoUpdReqSchema,
    companyOwnerInfo: companyOwnerInfoUpdReqSchema
}).min(1);

const updateContractOwnerReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyRoleReferenceSchema.required(),
    entityData: updateOwnerReqSchema.required()
});

const deleteContractOwnerReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyRoleReferenceSchema.required()
});

const getContractAuthorizedListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const createAuthorizedReqSchema = joi.object({
    personBasicInfo: personBasicInfoReqSchema.required(),
    permanentAddress: addressDetailSchema,
    authenticationData: authenticationDataReqSchema,
    clientRelationInfo: clientRelationInfoReqSchema,
    pepInfo: pepInfoReqSchema,
    authorizedPersonInfo: authorizedPersonInfoReqSchema
});

const createContractAuthorizedReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractReferenceSchema.required(),
    entityData: createAuthorizedReqSchema.required()
});

const updateAuthorizedReqSchema = joi.object({
    personBasicInfo: personBasicInfoUpdReqSchema,
    permanentAddress: addressDetailUpdESchema.allow(null),
    authenticationData: authenticationDataUpdReqSchema,
    clientRelationInfo: clientRelationInfoUpdReqSchema,
    pepInfo: pepInfoUpdReqSchema,
    authorizedPersonInfo: authorizedPersonInfoUpdReqSchema
}).min(1);

const updateContractAuthorizedReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyRoleReferenceSchema.required(),
    entityData: updateAuthorizedReqSchema.required()
});

const updateExecAuthorizationReqSchema = joi.object({
    authorizedPersonInfo: authorizedPersonInfoReqSchema.required()
}).min(1);

const updateContractExecAuthorizationReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyRoleReferenceSchema.required(),
    entityData: updateExecAuthorizationReqSchema.required()
});

const deleteContractAuthorizedReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyRoleReferenceSchema.required()
});

const updateContractPartyReferenceSchema = joi.object({
    contractualDocumentId: uuidSchema.required(),
    contractRelatedPersonId: uuidSchema.required(),
    _ts: timestampSchema.required(),
    _etag: etagSchema.required()
});

const createContractRelPersonDocumentReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractPartyReferenceSchema.required(),
    entityData: partyAttachmentReqSchema.required()
});

const getContractRelPersonDocumentListReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: contractReferenceSchema.required()
});

const updateContractRelPersonDocumentReferenceSchema = joi.object({
    contractualDocumentId: uuidSchema.required(),
    contractRelPersonDocumentId: uuidSchema.required(),
    _ts: timestampSchema.required(),
    _etag: etagSchema.required()
});

const deleteContractRelPersonDocumentReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateContractRelPersonDocumentReferenceSchema.required()
});

const requestContractSchema = {
    supportedEntity: supportedEntitySchema,
    createFrameContractReq: {
        '1.0.0': createFrameContractReqSchema
    },
    createFrameContractWoExecutiveReq: {
        '1.0.0': createFrameContractWoExecutiveReqSchema
    },
    readContractClientInfoReq: {
        '1.0.0': readContractClientInfoReqSchema
    },
    updateContractClientInfoReq: {
        '1.0.0': updateContractClientInfoReqSchema
    },
    deleteContractReq: {
        '1.0.0': deleteContractReqSchema
    },
    getFrameContractListReq: {
        '1.0.0': getFrameContractListReqSchema
    },
    checkFrameContractBeforeSubmitReq: {
        '1.0.0': checkFrameContractBeforeSubmitReqSchema
    },
    createContractClientContactReq: {
        '1.0.0': createContractClientContactReqSchema
    },
    updateContractClientContactReq: {
        '1.0.0': updateContractClientContactReqSchema
    },
    deleteContractClientContactReq: {
        '1.0.0': deleteContractClientContactReqSchema
    },
    getContractExecutiveListReq: {
        '1.0.0': getContractExecutiveListReqSchema
    },
    createContractExecutiveReq: {
        '1.0.0': createContractExecutiveReqSchema
    },
    updateContractExecutiveReq: {
        '1.0.0': updateContractExecutiveReqSchema
    },
    deleteContractExecutiveReq: {
        '1.0.0': deleteContractExecutiveReqSchema
    },
    readSignatureRulesReq: {
        '1.0.0': readSignatureRulesReqSchema
    },
    updateSignatureRulesReq: {
        '1.0.0': updateSignatureRulesReqSchema
    },
    readOwnersDisclaimerReq: {
        '1.0.0': readOwnersDisclaimerReqSchema
    },
    updateOwnersDisclaimerReq: {
        '1.0.0': updateOwnersDisclaimerReqSchema
    },
    getContractOwnerListReq: {
        '1.0.0': getContractOwnerListReqSchema
    },
    createContractOwnerReq: {
        '1.0.0': createContractOwnerReqSchema
    },
    updateContractOwnerReq: {
        '1.0.0': updateContractOwnerReqSchema
    },
    deleteContractOwnerReq: {
        '1.0.0': deleteContractOwnerReqSchema
    },
    getContractAuthorizedListReq: {
        '1.0.0': getContractAuthorizedListReqSchema
    },
    createContractAuthorizedReq: {
        '1.0.0': createContractAuthorizedReqSchema
    },
    updateContractAuthorizedReq: {
        '1.0.0': updateContractAuthorizedReqSchema
    },
    updateContractExecAuthorizationReq: {
        '1.0.0': updateContractExecAuthorizationReqSchema
    },
    deleteContractAuthorizedReq: {
        '1.0.0': deleteContractAuthorizedReqSchema
    },
    getContractRelPersonDocumentListReq: {
        '1.0.0': getContractRelPersonDocumentListReqSchema
    },
    createContractRelPersonDocumentReq: {
        '1.0.0': createContractRelPersonDocumentReqSchema
    },
    deleteContractRelPersonDocumentReq: {
        '1.0.0': deleteContractRelPersonDocumentReqSchema
    }
};

export default requestContractSchema;
