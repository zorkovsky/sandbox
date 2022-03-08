import joi from 'joi';

import {
    frontEndLanguages
} from '../enumerations';

import {
    entityTypeSchema,
    definitionVersionSchema,
    uuidSchema,
    documentHeaderSchema,
    auditInfoSchema,
    partyRoleReferenceSSchema
} from '../commonElementSchemas';

import {
    forbiddenInUpdate,
    allowNullInUpdate, 
    requiredInCreate
} from '../joi.helpers';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('userPreferencesDocumentSchema', 'userPreferencesDataSchema'),
    definitionVersion: definitionVersionSchema.when(
        'entityType',
        {
            switch: [
                {is: 'userPreferencesDocumentSchema', then: joi.valid('1.0.0')},
                {is: 'userPreferencesDataSchema', then: joi.valid('1.0.0')}
            ]
        }
    )
});

const displayNameSchema = joi.string();

const lastUsedContextSchema = joi.object({
    partyRole: partyRoleReferenceSSchema,
    contractualDocumentId: uuidSchema
}).xor('partyRole', 'contractualDocumentId');

const userPreferencesDataSchema = joi.object({
    userId: forbiddenInUpdate(uuidSchema),
    displayName: allowNullInUpdate(displayNameSchema),
    language: requiredInCreate(joi.string(), frontEndLanguages),
    lastUsedContext: allowNullInUpdate(lastUsedContextSchema)
}).min(1);

const userPreferencesDocumentSchema = joi.object({
    documentHeader: documentHeaderSchema.required(),
    auditInfo: auditInfoSchema.required(),
    documentData: userPreferencesDataSchema.required()
});

const modelUserPreferencesSchema = {
    supportedEntity: supportedEntitySchema,
    userPreferencesDocumentSchema: {
        '1.0.0': userPreferencesDocumentSchema
    },
    userPreferencesDataSchema: {
        '1.0.0': userPreferencesDataSchema
    }
};

export default modelUserPreferencesSchema;
