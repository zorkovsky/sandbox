import joi from 'joi';

import {
    sexes,
    annualTurnovers,
    expectedMonthTransAmounts,
    identityDocumentTypes,
    identityDocumentPartTypes,
    identityDocumentStates,
    partyIdentifierTypes,
    numOfEmployees,
    serviceReasons,
    tradingCurrencies
} from '../enumerations';

import {
    elementHeaderSchema,
    dataSourceSchema
} from '../commonElementSchemas';

import {
    countryESchema,
    countrySSchema
} from './contactSchemas';

export const sexESchema = joi.string().valid(
    ...sexes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const sexSSchema = sexESchema.valid(
    ...sexes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const firstNameSchema = joi.string();

export const middleNameSchema = joi.string();

export const surnameSchema = joi.string();

export const titleBeforeSchema = joi.string();

export const titleAfterSchema = joi.string();

export const birthDateSchema = joi.date();

export const personBasicInfoReqSchema = joi.object({
    firstName: firstNameSchema,
    middleName: middleNameSchema,
    surname: surnameSchema,
    titleBefore: titleBeforeSchema,
    titleAfter: titleAfterSchema,
    sex: sexESchema,
    birthDate: birthDateSchema,
    citizenship: countryESchema
}).min(1);

export const personBasicInfoUpdReqSchema = joi.object({
    firstName: firstNameSchema,
    middleName: middleNameSchema.allow(null),
    surname: surnameSchema,
    titleBefore: titleBeforeSchema.allow(null),
    titleAfter: titleAfterSchema.allow(null),
    sex: sexESchema.allow(null),
    birthDate: birthDateSchema.allow(null),
    citizenship: countryESchema.allow(null)
}).min(1);

export const personBasicInfoSchema = personBasicInfoReqSchema.keys({
    sex: sexSSchema,
    citizenship: countrySSchema,
    dataSource: dataSourceSchema.required()
});

export const personBasicInfoFilledInSchema = personBasicInfoReqSchema.keys({
    firstName: firstNameSchema.required(),
    surname: surnameSchema.required(),
    sex: sexSSchema.required(),
    citizenship: countrySSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const annualTurnoverESchema = joi.string().valid(
    ...annualTurnovers.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const annualTurnoverSSchema = annualTurnoverESchema.valid(
    ...annualTurnovers.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const numOfEmployeesESchema = joi.string().valid(
    ...numOfEmployees.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const numOfEmployeesSSchema = numOfEmployeesESchema.valid(
    ...numOfEmployees.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const businessAreaSchema = joi.string();

export const companyBasicInfoReqSchema = joi.object({
    taxDomicile: countryESchema,
    businessArea: businessAreaSchema,
    annualTurnover: annualTurnoverESchema,
    numOfEmployees: numOfEmployeesESchema
}).min(1);

export const companyBasicInfoUpdReqSchema = joi.object({
    taxDomicile: countryESchema.allow(null),
    businessArea: businessAreaSchema.allow(null),
    annualTurnover: annualTurnoverESchema.allow(null),
    numOfEmployees: numOfEmployeesESchema.allow(null)
}).min(1);

export const companyNameSchema = joi.string();

export const companyBasicInfoSchema = companyBasicInfoReqSchema.keys({
    taxDomicile: countrySSchema,
    annualTurnover: annualTurnoverSSchema,
    numOfEmployees: numOfEmployeesSSchema,
    companyName: companyNameSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const companyBasicInfoFilledInSchema = companyBasicInfoSchema.keys({
    taxDomicile: countrySSchema.required(),
    businessArea: businessAreaSchema.required(),
    annualTurnover: annualTurnoverSSchema.required(),
    numOfEmployees: numOfEmployeesSSchema.required()
});

export const orgUnitNameSchema = joi.string();

export const orgUnitBasicInfoSchema = joi.object({
    orgUnitName: orgUnitNameSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const systemNameSchema = joi.string();

export const systemBasicInfoSchema = joi.object({
    systemName: systemNameSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const expectedMonthTransAmountESchema = joi.string().valid(
    ...expectedMonthTransAmounts.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const expectedMonthTransAmountSSchema = expectedMonthTransAmountESchema.valid(
    ...expectedMonthTransAmounts.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const clientWebReferenceSchema = joi.string();

export const serviceReasonESchema = joi.string().valid(
    ...serviceReasons.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const serviceReasonSSchema = serviceReasonESchema.valid(
    ...serviceReasons.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const tradingCurrencyESchema = joi.string().valid(
    ...tradingCurrencies.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const tradingCurrencySSchema = tradingCurrencyESchema.valid(
    ...tradingCurrencies.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const additionalClientInfoReqSchema = joi.object({
    expectedMonthTransAmount: expectedMonthTransAmountESchema,
    clientWebReference: clientWebReferenceSchema,
    serviceReason: serviceReasonESchema,
    tradingCurrencies: joi.array().items(tradingCurrencyESchema).min(1)
}).min(1);

export const additionalClientInfoUpdReqSchema = joi.object({
    expectedMonthTransAmount: expectedMonthTransAmountESchema.allow(null),
    clientWebReference: clientWebReferenceSchema.allow(null),
    serviceReason: serviceReasonESchema.allow(null),
    tradingCurrencies: joi.array().items(tradingCurrencyESchema).min(1).allow(null)
}).min(1);

export const additionalClientInfoSchema = additionalClientInfoReqSchema.keys({
    expectedMonthTransAmount: expectedMonthTransAmountSSchema,
    serviceReason: serviceReasonSSchema,
    tradingCurrencies: joi.array().items(tradingCurrencySSchema).min(1),
    dataSource: dataSourceSchema.required()
});

export const additionalClientInfoFilledInSchema = additionalClientInfoSchema.keys({
    expectedMonthTransAmount: expectedMonthTransAmountSSchema.required(),
    clientWebReference: clientWebReferenceSchema.required(),
    serviceReason: serviceReasonSSchema.required(),
    tradingCurrencies: joi.array().items(tradingCurrencySSchema).min(1).required()
});

export const partyIdentifierTypeESchema = joi.string().valid(
    ...partyIdentifierTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const partyIdentifierTypeSSchema = partyIdentifierTypeESchema.valid(
    ...partyIdentifierTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const partyIdentifierValueSchema = joi.string();

export const partyIdentifierSchema = joi.object({
    partyIdentifierType: partyIdentifierTypeESchema.required(),
    partyIdentifierValue: partyIdentifierValueSchema.required()
});

export const partyIdentifierHSchema = partyIdentifierSchema.keys({
    partyIdentifierType: partyIdentifierTypeSSchema.required(),
    elementHeader: elementHeaderSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const identityDocumentTypeESchema = joi.string().valid(
    ...identityDocumentTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const identityDocumentTypeSSchema = identityDocumentTypeESchema.valid(
    ...identityDocumentTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const identityDocumentPartTypeESchema = joi.string().valid(
    ...identityDocumentPartTypes.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const identityDocumentPartTypeSSchema = identityDocumentPartTypeESchema.valid(
    ...identityDocumentPartTypes.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const blobNameSchema = joi.string();

export const partyAttachmentReqSchema = joi.object({
    attachmentType: identityDocumentTypeESchema.required(),
    attachmentPartType: identityDocumentPartTypeESchema.required(),
    blobName: blobNameSchema.required()
});

export const identityDocumentStateESchema = joi.string().valid(
    ...identityDocumentStates.values.filter(v => (v.valueUsage === 'CanBeEntered')).map(v => v.keyPlatform)
);
export const identityDocumentStateSSchema = identityDocumentStateESchema.valid(
    ...identityDocumentStates.values.filter(v => (v.valueUsage === 'CanBeSaved')).map(v => v.keyPlatform)
);

export const partyAttachmentSchema = partyAttachmentReqSchema.keys({
    attachmentType: identityDocumentTypeSSchema.required(),
    attachmentPartType: identityDocumentPartTypeSSchema.required(),
    attachmentState: identityDocumentStateSSchema.required(),
    dataSource: dataSourceSchema.required()
});

export const partyAttachmentHSchema = partyAttachmentSchema.keys({
    elementHeader: elementHeaderSchema.required()
});

export const isPepSchema = joi.boolean();

export const pepDetailsSchema = joi.string();

export const pepInfoReqSchema = joi.object({
    isPep: isPepSchema,
    pepDetails: pepDetailsSchema
}).min(1);

export const pepInfoUpdReqSchema = joi.object({
    isPep: isPepSchema,
    pepDetails: pepDetailsSchema.allow(null)
}).min(1);

export const pepInfoSchema = pepInfoReqSchema.keys({
    dataSource: dataSourceSchema.required()
});

export const pepInfoFilledInSchema = pepInfoReqSchema.keys({
    isPep: isPepSchema.required(),
    pepDetails: joi.when(
        'isPep',
        {
            is: true,
            then: pepDetailsSchema.required(),
            otherwise: pepDetailsSchema.optional()
        }
    ),
    dataSource: dataSourceSchema.required()
});
