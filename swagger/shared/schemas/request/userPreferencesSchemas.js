import joi from 'joi';
import modelUserPreferencesSchema from '../model/userPreferencesSchemas';
const userPreferencesDataSchema = modelUserPreferencesSchema.userPreferencesDataSchema['1.0.0'];

import {
    entityTypeSchema,
    definitionVersionSchema,
    requestorIdentitySchema,
    uuidSchema,
    timestampSchema,
    etagSchema
} from '../commonElementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('createUserPreferencesReq', 'updateUserPreferencesReq', 'readUserPreferencesReq'),
    definitionVersion: definitionVersionSchema.when(
        'entityType', 
        {
            switch: [
                {is: 'createUserPreferencesReq', then: joi.valid('1.0.0')},
                {is: 'updateUserPreferencesReq', then: joi.valid('1.0.0')},
                {is: 'readUserPreferencesReq', then: joi.valid('1.0.0')},
            ]
        }
    )
});

const userPreferencesReferenceSchema = joi.object({
    userId: uuidSchema.required()
});

const updateUserPreferencesReferenceSchema = joi.object({
    userPreferencesId: uuidSchema.required(),
    _ts: timestampSchema.required(),
    _etag: etagSchema.required()
});

const createUserPreferencesReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityData: userPreferencesDataSchema.required()
});

const updateUserPreferencesReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    updateEntityReference: updateUserPreferencesReferenceSchema.required(),
    entityData: userPreferencesDataSchema.required()
});

const readUserPreferencesReqSchema = joi.object({
    requestorIdentity: requestorIdentitySchema.required(),
    entityReference: userPreferencesReferenceSchema.required()
});

const requestUserPreferencesSchema = {
    supportedEntity: supportedEntitySchema,
    createUserPreferencesReq: {
        '1.0.0': createUserPreferencesReqSchema
    },
    updateUserPreferencesReq: {
        '1.0.0': updateUserPreferencesReqSchema
    },
    readUserPreferencesReq: {
        '1.0.0': readUserPreferencesReqSchema
    }
};

export default requestUserPreferencesSchema;
