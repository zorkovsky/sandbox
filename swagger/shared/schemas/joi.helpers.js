import joi from 'joi';

export const forbiddenInUpdate = obj => obj.when(
    '$validationContext',
    {
        is: 'UpdateRequest',
        then: joi.forbidden(),
        otherwise: joi.required()
    }
);

export const allowNullInUpdate = obj => obj.when(
    '$validationContext',
    {
        is: 'UpdateRequest',
        then: joi.allow(null)
    }
);

export const requiredInCreate = (obj, enums) => obj.when(
    '$validationContext',
    {
        switch: [
            {is: 'CreateRequest', then: joi.required().valid(...enums.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform))},
            {is: 'UpdateRequest', then: joi.optional().valid(...enums.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform))},
            {is: 'Database', then: joi.optional().valid(...enums.values.filter(v => (v.valueUsage in ['CanBeEntered', 'CanBeSaved'])).map(v => v.keyPlatform))}
        ]
    }
);
