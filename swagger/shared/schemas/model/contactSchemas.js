import joi from 'joi';

import {
    contactTypes,
    contactSubtypes,
    contactStatuses,
    countries
} from '../enumerations';

import {
    elementHeaderSchema,
    dataSourceSchema
} from '../commonElementSchemas';

// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
export const countryESchema = joi.string().valid(
    ...countries.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const countrySSchema = countryESchema.valid(
    ...countries.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

// https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
// eslint-disable-next-line no-control-regex
export const emailSchema = joi.string().pattern(new RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i));

export const emailDetailSchema = joi.object({
    email: emailSchema.required()
});

export const phoneSchema = joi.string();

export const phoneDetailSchema = joi.object({
    phone: phoneSchema.required()
});

export const streetSchema = joi.string();

export const streetNoSchema = joi.string();

export const houseNoSchema = joi.string();

export const flatNoSchema = joi.string();

export const cityPartSchema = joi.string();

export const citySchema = joi.string();

export const higherAdminUnitSchema = joi.string();

export const zipCodeSchema = joi.string();

export const addressDetailSchema = joi.object({
    street: streetSchema,
    streetNo: streetNoSchema,
    houseNo: houseNoSchema,
    flatNo: flatNoSchema,
    cityPart: cityPartSchema,
    city: citySchema,
    higherAdminUnit: higherAdminUnitSchema,
    country: countryESchema,
    zipCode: zipCodeSchema
}).min(1);

export const addressDetailUpdESchema = joi.object({
    street: streetSchema.allow(null),
    streetNo: streetNoSchema.allow(null),
    houseNo: houseNoSchema.allow(null),
    flatNo: flatNoSchema.allow(null),
    cityPart: cityPartSchema.allow(null),
    city: citySchema.allow(null),
    higherAdminUnit: higherAdminUnitSchema.allow(null),
    country: countryESchema.allow(null),
    zipCode: zipCodeSchema.allow(null)
}).min(1);

export const contactTypeESchema = joi.string().valid(
    ...contactTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const contactTypeSSchema = contactTypeESchema.valid(
    ...contactTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const contactSubtypeESchema = joi.string().valid(
    ...contactSubtypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const contactSubtypeSSchema = contactSubtypeESchema.valid(
    ...contactSubtypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const contactStatusESchema = joi.string().valid(
    ...contactStatuses.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const contactStatusSSchema = contactStatusESchema.valid(
    ...contactStatuses.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const partyContactReqSchema = joi.object({
    contactType: contactTypeESchema.required(),
    contactSubtype: contactSubtypeESchema,
    emailDetail: joi.when(
        'contactType',
        {
            is: 'Email',
            then: emailDetailSchema.optional(),
            otherwise: joi.any().forbidden()
        }
    ),
    phoneDetail: joi.when(
        'contactType',
        {
            is: 'Phone',
            then: phoneDetailSchema.optional(),
            otherwise: joi.any().forbidden()
        }
    ),
    addressDetail: joi.when(
        'contactType',
        {
            is: 'Address',
            then: addressDetailSchema.optional(),
            otherwise: joi.any().forbidden()
        }
    )
});

export const partyContactUpdReqSchema = joi.object({
    contactType: contactTypeESchema.required(),
    contactSubtype: contactSubtypeESchema,
    emailDetail: joi.when(
        'contactType',
        {
            is: 'Email',
            then: emailDetailSchema.optional(),
            otherwise: joi.any().forbidden()
        }
    ),
    phoneDetail: joi.when(
        'contactType',
        {
            is: 'Phone',
            then: phoneDetailSchema.optional(),
            otherwise: joi.any().forbidden()
        }
    ),
    addressDetail: joi.when(
        'contactType',
        {
            is: 'Address',
            then: addressDetailUpdESchema.optional(),
            otherwise: joi.any().forbidden()
        }
    )
});

export const partyContactSchema = partyContactReqSchema.keys({
    contactType: contactTypeSSchema.required(),
    contactSubtype: contactSubtypeSSchema,
    contactStatus: contactStatusSSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const partyContactFilledInSchema = joi.object({
    contactType: contactTypeESchema.required(),
    contactSubtype: contactSubtypeSSchema.required(),
    emailDetail: joi.when(
        'contactType',
        {
            is: 'Email',
            then: emailDetailSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    phoneDetail: joi.when(
        'contactType',
        {
            is: 'Phone',
            then: phoneDetailSchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    addressDetail: joi.when(
        'contactType',
        {
            is: 'Address',
            then: addressDetailUpdESchema.required(),
            otherwise: joi.any().forbidden()
        }
    ),
    contactStatus: contactStatusSSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const partyContactHSchema = partyContactSchema.keys({
    elementHeader: elementHeaderSchema.required()
});
