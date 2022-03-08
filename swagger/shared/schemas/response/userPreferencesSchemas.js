import joi from 'joi';
import modelUserPreferencesSchema from '../model/userPreferencesSchemas';
const userPreferencesDataSchema = modelUserPreferencesSchema.userPreferencesDataSchema['1.0.0'];

import {
    entityTypeSchema,
    definitionVersionSchema,
    entityHeaderSchema
} from '../commonElementSchemas';

const supportedEntitySchema = joi.object({
    entityType: entityTypeSchema.required().valid('createUserPreferencesRes', 'updateUserPreferencesRes', 'readUserPreferencesRes'),
    definitionVersion: definitionVersionSchema.when(
        'entityType', 
        {
            switch: [
                {is: 'createUserPreferencesRes', then: joi.valid('1.0.0')},
                {is: 'updateUserPreferencesRes', then: joi.valid('1.0.0')},
                {is: 'readUserPreferencesRes', then: joi.valid('1.0.0')},
            ]
        }
    )
});

const createUserPreferencesResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: userPreferencesDataSchema.required()
});

const updateUserPreferencesResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: userPreferencesDataSchema.required()
});

const readUserPreferencesResSchema = joi.object({
    entityHeader: entityHeaderSchema.required(),
    entityData: userPreferencesDataSchema.required()
});

const responseUserPreferencesSchema = {
    supportedEntity: supportedEntitySchema,
    createUserPreferencesRes: {
        '1.0.0': createUserPreferencesResSchema
    },
    updateUserPreferencesRes: {
        '1.0.0': updateUserPreferencesResSchema
    },
    readUserPreferencesRes: {
        '1.0.0': readUserPreferencesResSchema
    }
};

export default responseUserPreferencesSchema;
