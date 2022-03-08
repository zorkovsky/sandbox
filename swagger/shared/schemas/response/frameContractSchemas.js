import joi from 'joi';

import {
    frameContractSections,
    validationStatuses,
    frameContractErrors
} from '../enumerations';

import {
    frameContractEntitySchema,
    contractExecutiveSchema,
    contractOwnerSchema,
    contractAuthorizedSchema,
    signatureRulesSchema,
    ownersDisclaimerSchema,
    updateExecAuthorizationSchema
} from '../model/frameContractSchemas';

import {
    entityTypeSchema,
    entityHeaderSchema,
    definitionVersionSchema,
    pagingResponseSchema,
    entityReferenceSchema
} from '../commonElementSchemas';

import {
    partyContactSchema
} from '../model/contactSchemas';

import {
    partyAttachmentSchema,
    partyAttachmentHSchema,
    personBasicInfoSchema
} from '../model/partyBasicInfoSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('createFrameContractRes', 'createFrameContractWoExecutiveRes',
        'readContractClientInfoRes', 'updateContractClientInfoRes', 'deleteContractRes', 'getFrameContractListRes', 'checkFrameContractBeforeSubmitRes',
        'createContractClientContactRes', 'updateContractClientContactRes', 'deleteContractClientContactRes',
        'getContractExecutiveListRes', 'createContractExecutiveRes', 'updateContractExecutiveRes', 'deleteContractExecutiveRes',
        'readSignatureRulesRes', 'updateSignatureRulesRes', 'readOwnersDisclaimerRes', 'updateOwnersDisclaimerRes',
        'getContractOwnerListRes', 'createContractOwnerRes', 'updateContractOwnerRes', 'deleteContractOwnerRes',
        'getContractAuthorizedListRes', 'createContractAuthorizedRes', 'updateContractAuthorizedRes', 'updateContractExecAuthorizationRes', 'deleteContractAuthorizedRes',
        'getContractRelPersonDocumentListRes', 'createContractRelPersonDocumentRes', 'deleteContractRelPersonDocumentRes'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'createFrameContractRes', then: joi.valid('1.0.0')},
                {is: 'createFrameContractWoExecutiveRes', then: joi.valid('1.0.0')},
                {is: 'readContractClientInfoRes', then: joi.valid('1.0.0')},
                {is: 'updateContractClientInfoRes', then: joi.valid('1.0.0')},
                {is: 'deleteContractRes', then: joi.valid('1.0.0')},
                {is: 'getFrameContractListRes', then: joi.valid('1.0.0')},
                {is: 'checkFrameContractBeforeSubmitRes', then: joi.valid('1.0.0')},
                {is: 'createContractClientContactRes', then: joi.valid('1.0.0')},
                {is: 'updateContractClientContactRes', then: joi.valid('1.0.0')},
                {is: 'deleteContractClientContactRes', then: joi.valid('1.0.0')},
                {is: 'getContractExecutiveListRes', then: joi.valid('1.0.0')},
                {is: 'createContractExecutiveRes', then: joi.valid('1.0.0')},
                {is: 'updateContractExecutiveRes', then: joi.valid('1.0.0')},
                {is: 'deleteContractExecutiveRes', then: joi.valid('1.0.0')},
                {is: 'readSignatureRulesRes', then: joi.valid('1.0.0')},
                {is: 'updateSignatureRulesRes', then: joi.valid('1.0.0')},
                {is: 'readOwnersDisclaimerRes', then: joi.valid('1.0.0')},
                {is: 'updateOwnersDisclaimerRes', then: joi.valid('1.0.0')},
                {is: 'getContractOwnerListRes', then: joi.valid('1.0.0')},
                {is: 'createContractOwnerRes', then: joi.valid('1.0.0')},
                {is: 'updateContractOwnerRes', then: joi.valid('1.0.0')},
                {is: 'deleteContractOwnerRes', then: joi.valid('1.0.0')},
                {is: 'getContractAuthorizedListRes', then: joi.valid('1.0.0')},
                {is: 'createContractAuthorizedRes', then: joi.valid('1.0.0')},
                {is: 'updateContractAuthorizedRes', then: joi.valid('1.0.0')},
                {is: 'updateContractExecAuthorizationRes', then: joi.valid('1.0.0')},
                {is: 'deleteContractAuthorizedRes', then: joi.valid('1.0.0')},
                {is: 'getContractRelPersonDocumentListRes', then: joi.valid('1.0.0')},
                {is: 'createContractRelPersonDocumentRes', then: joi.valid('1.0.0')},
                {is: 'updateContractRelPersonDocumentRes', then: joi.valid('1.0.0')},
                {is: 'deleteContractRelPersonDocumentRes', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const createFrameContractResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: frameContractEntitySchema.required()
});

const readContractClientInfoResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: frameContractEntitySchema.required()
});

const updateContractClientInfoResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: frameContractEntitySchema.required()
});

const deleteContractResSchema = joi.object({
    entityHeader: entityHeaderSchema.required()
});

const getFrameContractListResSchema = joi.object({
    pagingResponse: pagingResponseSchema.required(),
    returnedItems: joi.array().items(frameContractEntitySchema)
});

const frameContractSectionSchema = joi.string().valid(
    ...frameContractSections.values.filter(v => (v.valueUsage in ['CanBeEntered', 'CanBeSaved'])).map(v => v.keyPlatform)
);

const validationStatusSchema = joi.string().valid(
    ...validationStatuses.values.filter(v => (v.valueUsage in ['CanBeEntered', 'CanBeSaved'])).map(v => v.keyPlatform)
);

const frameContractErrorSchema = joi.string().valid(
    ...frameContractErrors.values.filter(v => (v.valueUsage in ['CanBeEntered', 'CanBeSaved'])).map(v => v.keyPlatform)
);

const attributePathSchema = joi.string();

const validValueSchema = joi.string();

const minItemsSchema = joi.number().integer();

const minElementsSchema = joi.number().integer();

const maxItemsSchema = joi.number().integer();

const maxElementsSchema = joi.number().integer();

const errorSpecificationSchema = joi.object({
    errorType: frameContractErrorSchema,
    attributePath: attributePathSchema,
    entityReference: entityReferenceSchema,
    validValues: joi.array().items(validValueSchema),
    minItems: minItemsSchema,
    minElements: minElementsSchema,
    maxItems: maxItemsSchema,
    maxElements: maxElementsSchema
});

const checkSectionResultSchema = joi.object({
    section: frameContractSectionSchema.required(),
    sectionState: validationStatusSchema.required(),
    errorList: joi.array().items(errorSpecificationSchema)
});

const checkFrameContractBeforeSubmitResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    checkResults: joi.array().items(checkSectionResultSchema).required()
});

const createContractClientContactResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: partyContactSchema.required()
});

const updateContractClientContactResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: partyContactSchema.required()
});

const deleteContractClientContactResSchema = joi.object({
    entityHeader: entityHeaderSchema.required()
});

export const contractExecutiveEntitySchema = contractExecutiveSchema.keys({
    entityHeader: entityHeaderSchema.required()
});

const getContractExecutiveListResSchema = joi.object({
    pagingResponse: pagingResponseSchema.required(),
    returnedItems: joi.array().items(contractExecutiveEntitySchema)
});

const createContractExecutiveResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: contractExecutiveSchema.required()
});

const updateContractExecutiveResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: contractExecutiveSchema.required()
});

const deleteContractExecutiveResSchema = joi.object({
    entityHeader: entityHeaderSchema.required()
});

const readSignatureRulesResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: signatureRulesSchema
});

const updateSignatureRulesResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: signatureRulesSchema.required()
});

const readOwnersDisclaimerResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: ownersDisclaimerSchema.required()
});

const updateOwnersDisclaimerResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: ownersDisclaimerSchema.required()
});

export const contractOwnerEntitySchema = contractOwnerSchema.keys({
    entityHeader: entityHeaderSchema.required()
});

const getContractOwnerListResSchema = joi.object({
    pagingResponse: pagingResponseSchema.required(),
    returnedItems: joi.array().items(contractOwnerEntitySchema)
});

const createContractOwnerResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: contractOwnerSchema.required()
});

const updateContractOwnerResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: contractOwnerSchema.required()
});

const deleteContractOwnerResSchema = joi.object({
    entityHeader: entityHeaderSchema.required()
});

export const contractAuthorizedEntitySchema = contractAuthorizedSchema.keys({
    entityHeader: entityHeaderSchema.required()
});

const getContractAuthorizedListResSchema = joi.object({
    pagingResponse: pagingResponseSchema.required(),
    returnedItems: joi.array().items(contractAuthorizedEntitySchema)
});

const createContractAuthorizedResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: contractAuthorizedSchema.required()
});

const updateContractAuthorizedResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: contractAuthorizedSchema.required()
});

const updateContractExecAuthorizationResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: updateExecAuthorizationSchema.required()
});

const deleteContractAuthorizedResSchema = joi.object({
    entityHeader: entityHeaderSchema.required()
});

const relPersonDocumentListEntitySchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    personBasicInfo: personBasicInfoSchema.required(),
    personDocuments: joi.array().items(partyAttachmentHSchema)
});

const getContractRelPersonDocumentListResSchema = joi.object({
    pagingResponse: pagingResponseSchema.required(),
    returnedItems: joi.array().items(relPersonDocumentListEntitySchema)
});

const createContractRelPersonDocumentResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: partyAttachmentSchema.required()
});

const deleteContractRelPersonDocumentResSchema = joi.object({
    entityHeader: entityHeaderSchema.required()
});

const responseContractSchema = {
    supportedEntity: supportedEntitySchema,
    createFrameContractRes: {
        '1.0.0': createFrameContractResSchema
    },
    createFrameContractWoExecutiveRes: {
        '1.0.0': createFrameContractResSchema
    },
    readContractClientInfoRes: {
        '1.0.0': readContractClientInfoResSchema
    },
    updateContractClientInfoRes: {
        '1.0.0': updateContractClientInfoResSchema
    },
    deleteContractRes: {
        '1.0.0': deleteContractResSchema
    },
    getFrameContractListRes: {
        '1.0.0': getFrameContractListResSchema
    },
    checkFrameContractBeforeSubmitRes: {
        '1.0.0': checkFrameContractBeforeSubmitResSchema
    },
    createContractClientContactRes: {
        '1.0.0': createContractClientContactResSchema
    },
    updateContractClientContactRes: {
        '1.0.0': updateContractClientContactResSchema
    },
    deleteContractClientContactRes: {
        '1.0.0': deleteContractClientContactResSchema
    },
    getContractExecutiveListRes: {
        '1.0.0': getContractExecutiveListResSchema
    },
    createContractExecutiveRes: {
        '1.0.0': createContractExecutiveResSchema
    },
    updateContractExecutiveRes: {
        '1.0.0': updateContractExecutiveResSchema
    },
    deleteContractExecutiveRes: {
        '1.0.0': deleteContractExecutiveResSchema
    },
    readSignatureRulesRes: {
        '1.0.0': readSignatureRulesResSchema
    },
    updateSignatureRulesRes: {
        '1.0.0': updateSignatureRulesResSchema
    },
    readOwnersDisclaimerRes: {
        '1.0.0': readOwnersDisclaimerResSchema
    },
    updateOwnersDisclaimerRes: {
        '1.0.0': updateOwnersDisclaimerResSchema
    },
    getContractOwnerListRes: {
        '1.0.0': getContractOwnerListResSchema
    },
    createContractOwnerRes: {
        '1.0.0': createContractOwnerResSchema
    },
    updateContractOwnerRes: {
        '1.0.0': updateContractOwnerResSchema
    },
    deleteContractOwnerRes: {
        '1.0.0': deleteContractOwnerResSchema
    },
    getContractAuthorizedListRes: {
        '1.0.0': getContractAuthorizedListResSchema
    },
    createContractAuthorizedRes: {
        '1.0.0': createContractAuthorizedResSchema
    },
    updateContractAuthorizedRes: {
        '1.0.0': updateContractAuthorizedResSchema
    },
    updateContractExecAuthorizationRes: {
        '1.0.0': updateContractExecAuthorizationResSchema
    },
    deleteContractAuthorizedRes: {
        '1.0.0': deleteContractAuthorizedResSchema
    },
    getContractRelPersonDocumentListRes: {
        '1.0.0': getContractRelPersonDocumentListResSchema
    },
    createContractRelPersonDocumentRes: {
        '1.0.0': createContractRelPersonDocumentResSchema
    },
    deleteContractRelPersonDocumentRes: {
        '1.0.0': deleteContractRelPersonDocumentResSchema
    }
};

export default responseContractSchema;
