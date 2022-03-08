// Business enumerations
export const frontEndLanguages = {
    enumHeader: {
        enumCode: "frontEndLanguage",
        description: "Languages which can user use on the front-end"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "CZ",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "EN",
            sortKey: 2
        },
        {
            valueUsage: "CanBeSaved",
            keyPlatform: "JP",
            sortKey: 100
        }
    ]
};

export const sexes = {
    enumHeader: {
        enumCode: "sex",
        description: "Sexes of persons"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Male",
            sortKey: 1,
            keyMerk: "m"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Female",
            sortKey: 2,
            keyMerk: "f"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Other",
            sortKey: 3,
            keyMerk: "o"
        }
    ]
};

export const tradingCurrencies = {
    enumHeader: {
        enumCode: "tradingCurrency",
        description: "Currencies which client can use for trading"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "EUR",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "CZK",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "USD",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "GBP",
            sortKey: 4
        }
    ]
};

export const annualTurnovers = {
    enumHeader: {
        enumCode: "annualTurnover",
        description: "Anual turnovers of company"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "UpTo_1_mio",
            sortKey: 1,
            currency: "CZK"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "1_10_mio",
            sortKey: 2,
            currency: "CZK"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "10_30_mio",
            sortKey: 3,
            currency: "CZK"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "30_100_mio",
            sortKey: 4,
            currency: "CZK"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "100_500_mio",
            sortKey: 5,
            currency: "CZK"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "500_1500_mio",
            sortKey: 6,
            currency: "CZK"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MoreThan_1500_mio",
            sortKey: 7,
            currency: "CZK"
        }
    ]
};

export const numOfEmployees = {
    enumHeader: {
        enumCode: "numOfEmployees",
        description: "Number of company employees"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "0_Emp",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "1_3_Emp",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "4_10_Emp",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "10_25_Emp",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "25_100_Emp",
            sortKey: 5
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "100+_Emp",
            sortKey: 6
        }
    ]
};

export const expectedMonthTransAmounts = {
    enumHeader: {
        enumCode: "expectedMonthTransAmount",
        description: "Expected amout of transactions per month"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "UpTo_20_k",
            currency: "EUR",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "20_50_k",
            currency: "EUR",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MoreThan_50_k",
            currency: "EUR",
            sortKey: 3
        },
        {
            valueUsage: "CanBeSaved",
            keyPlatform: "UpTo_05_mio",
            currency: "EUR",
            sortKey: 101
        },
        {
            valueUsage: "CanBeSaved",
            keyPlatform: "05_1_mio",
            currency: "EUR",
            sortKey: 102
        },
        {
            valueUsage: "CanBeSaved",
            keyPlatform: "1_3_mio",
            currency: "EUR",
            sortKey: 103
        },
        {
            valueUsage: "CanBeSaved",
            keyPlatform: "3_5_mio",
            currency: "EUR",
            sortKey: 104
        },
        {
            valueUsage: "CanBeSaved",
            keyPlatform: "5_10_mio",
            currency: "EUR",
            sortKey: 105
        },
        {
            valueUsage: "CanBeSaved",
            keyPlatform: "MoreThan_10_mio",
            currency: "EUR",
            sortKey: 106
        }
    ]
};

export const serviceReasons = {
    enumHeader: {
        enumCode: "serviceReason",
        description: "Reasons why client wants to use Akcenta services"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "InvoicePay",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Import",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Export",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Other",
            sortKey: 999
        }
    ]
};

export const identityDocumentTypes = {
    enumHeader: {
        enumCode: "identityDocumentType",
        description: "Types of identity documents"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "IdentityCard",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Passport",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "DrivingLicence",
            sortKey: 3
        }
    ]
};

export const identityDocumentPartTypes = {
    enumHeader: {
        enumCode: "identityDocumentPartType",
        description: "Types of identity document parts"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "IdentityCardFrontPage",
            sortKey: 1,
            identityDocumentType: ["IdentityCard"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "IdentityCardBackPage",
            sortKey: 2,
            identityDocumentType: ["IdentityCard"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PassportOwnerPage",
            sortKey: 3,
            identityDocumentType: ["Passport"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "DrivingLicenceFrontPage",
            sortKey: 4,
            identityDocumentType: ["DrivingLicence"]
        }
    ]
};

export const identityDocumentStates = {
    enumHeader: {
        enumCode: "identityDocumentState",
        description: "States of identity documents"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Uploaded",
            sortKey: 1
        }
    ]
};

export const partyIdentifierTypes = {
    enumHeader: {
        enumCode: "partyIdentifierType",
        description: "Types of party identifiers"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Ico",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Dic",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MerkId",
            sortKey: 3
        }
    ]
};

export const contactTypes = {
    enumHeader: {
        enumCode: "contactType",
        description: "Types of contact informations"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Email",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Phone",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Address",
            sortKey: 3
        }
    ]
};

export const contactSubtypes = {
    enumHeader: {
        enumCode: "contactSubtype",
        description: "Sub-types of contact informations"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "AuthorizationEmail",
            sortKey: 1,
            contactType: ["Email"],
            partyType: ["Person"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "AuthorizationPhone",
            sortKey: 2,
            contactType: ["Phone"],
            partyType: ["Person"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "HeadquarterAddress",
            sortKey: 3,
            contactType: ["Address"],
            partyType: ["Company"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContactAddress",
            sortKey: 4,
            contactType: ["Address"],
            partyType: ["Company", "Person"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PermanentAddress",
            sortKey: 5,
            contactType: ["Address"],
            partyType: ["Person"]
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "BusinessPremises",
            sortKey: 6,
            contactType: ["Address"],
            partyType: ["Company"]
        }
    ]
};

export const contactStatuses = {
    enumHeader: {
        enumCode: "contactStatus",
        description: "Statuses of contact informations"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Verified",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Unverified",
            sortKey: 2
        }
    ]
};

export const countries = {
    enumHeader: {
        enumCode: "country",
        description: "Countries"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "AUT",
            sortKey: 1,
            keyMerk: "at"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "BGR",
            sortKey: 2,
            keyMerk: "bg"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "CZE",
            sortKey: 3,
            keyMerk: "cz"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ESP",
            sortKey: 4,
            keyMerk: "es"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "GBR",
            sortKey: 5,
            keyMerk: "gb"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "LVA",
            sortKey: 6,
            keyMerk: "lv"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "POL",
            sortKey: 7,
            keyMerk: "pl"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "SVK",
            sortKey: 8,
            keyMerk: "sk"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "USA",
            sortKey: 9,
            keyMerk: "us"
        }
    ]
};

export const signatureMethods = {
    enumHeader: {
        enumCode: "signatureMethod",
        description: "Signature methods of executive representatives"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "OneExecutive",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MultipleExecutives",
            sortKey: 2
        }
    ]
};

export const accessLevels = {
    enumHeader: {
        enumCode: "accessLevel",
        description: "Access levels of authorization persons"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Full",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ReadOnly",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "None",
            sortKey: 3
        }
    ]
};

// System implementation based enumerations
export const functionNames = {
    enumHeader: {
        enumCode: "functionName",
        description: "Names of functions/services published by solution"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "createFrameContract",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "deleteContract",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "readContractClientInfo",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "updateContractClientInfo",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "createContractClientContact",
            sortKey: 5
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "updateContractClientContact",
            sortKey: 6
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "deleteContractClientContact",
            sortKey: 7
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "getCompanyRegistryList",
            sortKey: 8
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "readCompanyRegistry",
            sortKey: 9
        }
    ]
};

export const entityTypes = {
    enumHeader: {
        enumCode: "entityType",
        description: "Types of entities"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContractualDocument",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PartyContact",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContractRelatedExecutive",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContractRelatedOwner",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PartyDocument",
            sortKey: 5
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PersonDocumentList",
            sortKey: 6
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "UserPreferences",
            sortKey: 7
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "SignatureRules",
            sortKey: 8
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ClientAddress",
            sortKey: 9
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ClientPhone",
            sortKey: 10
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ClientEmail",
            sortKey: 11
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "RelatedPersonAddress",
            sortKey: 12
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "RelatedPersonPhone",
            sortKey: 13
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "RelatedPersonEmail",
            sortKey: 14
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "OwnersDisclaimer",
            sortKey: 15
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContractRelAuthorizedPers",
            sortKey: 16
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContractRelAuthorizedExec",
            sortKey: 17
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "userPreferencesPersistDocument",
            sortKey: 200
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "userPreferencesSession",
            sortKey: 300
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PartyIdentifier",
            sortKey: 600
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PartyRole",
            sortKey: 700
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PartyRoleRelation",
            sortKey: 800
        }
    ]
};

export const documentTypes = {
    enumHeader: {
        enumCode: "documentType",
        description: "Types of database documents"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Party",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "UserPreferencesPersist",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContractualDocument",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "UserPreferences",
            sortKey: 4
        }
    ]
};

export const frameContractSections = {
    enumHeader: {
        enumCode: "frameContractSection",
        description: "Sections of frame contract document"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ClientInfo",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "CompanyExecutives",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "CompanyOwners",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "AuthorizedPersons",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "IdentityDocuments",
            sortKey: 5
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Accounts",
            sortKey: 6
        }
    ]
};

export const validationStatuses = {
    enumHeader: {
        enumCode: "validationStatuse",
        description: "Section level results of validation"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Completed",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Incompleted",
            sortKey: 2
        }
    ]
};

export const userRoleTypes = {
    enumHeader: {
        enumCode: "userRoleType",
        description: "Possible roles of logged-in user who doesn't have selected party role",
        defaultValue: "LoggedInUser"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "LoggedInUser",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ApplicationCreator",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ExecutiveRepresentative",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "CompanyOwner",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "AuthorizedPerson",
            sortKey: 5
        }
    ]
};

export const partyRoleTypes = {
    enumHeader: {
        enumCode: "partyRoleType",
        description: "Possible party roles"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ComplianceOfficer",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ContractMngrOfficer",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Manager",
            sortKey: 3
        }
    ]
};

export const dataSources = {
    enumHeader: {
        enumCode: "dataSource",
        description: "Sources of data"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Client",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "AkcentaEmployee",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Ares",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Merk",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "System",
            sortKey: 5
        }
    ]
};

export const authorizationFactorTypes = {
    enumHeader: {
        enumCode: "authorizationFactorType",
        description: "Posible scond authorization factors"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "SmsOtp",
            sortKey: 1
        }
    ]
};

export const clientTypes = {
    enumHeader: {
        enumCode: "clientType",
        description: "Client types"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Person",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Company",
            sortKey: 2
        }
    ]
};

export const contractualDocumentBusinessStates = {
    enumHeader: {
        enumCode: "contractualDocumentBusinessState",
        description: "States of the contractual document"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "PreparationByClient",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ForProcessing",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ForSignature",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Canceled",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Signed",
            sortKey: 5
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Rejected",
            sortKey: 6
        }
    ]
};

export const contractualDocumentTypes = {
    enumHeader: {
        enumCode: "contractualDocumentType",
        description: "Types of contractual documents"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "FrameContract",
            sortKey: 1
        }
    ]
};

export const relatedPersonRoleTypes = {
    enumHeader: {
        enumCode: "relatedPersonRoleType",
        description: "Types of persons used in contractual documents"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ExecutiveRepresentative",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "CompanyOwner",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "AuthorizedPerson",
            sortKey: 3
        }
    ]
};

export const partyTypes = {
    enumHeader: {
        enumCode: "partyType",
        description: "Party types"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Person",
            sortKey: 1,
            keyMerk: "person"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Company",
            sortKey: 2,
            keyMerk: "company"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "OrgUnit",
            sortKey: 3,
            keyMerk: "organization unit"
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "System",
            sortKey: 4,
            keyMerk: "system"
        }
    ]
};

export const partyRoleRelationTypes = {
    enumHeader: {
        enumCode: "partyRoleRelationType",
        description: "Relation types between party roles"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Company-ComplianceOfficer",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Company-ContractMngrOfficer",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Company-Manager",
            sortKey: 3
        }
    ]
};

export const frameContractErrors = {
    enumHeader: {
        enumCode: "frameContractError",
        description: "Types of frame contract errors"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "WrongEnumValue",
            keyJoi: "must be one of ",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MissingRequiredValue",
            keyJoi: "is required",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "TooFewElements",
            keyJoi: "must have at le",
            sortKey: 3
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "TooFewItems",
            keyJoi: "must contain at",
            sortKey: 4
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "TooManyElements",
            keyJoi: "must have less ",
            sortKey: 5
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "TooManyItems",
            keyJoi: "must contain le",
            sortKey: 6
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "NotAllowed",
            keyJoi: "is not allowed",
            sortKey: 7
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MissingIcoIdentifier",
            sortKey: 8
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ManyIcoIdentifiers",
            sortKey: 9
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MissingClientHQAddress",
            sortKey: 10
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "ManyClientHQAddresses",
            sortKey: 11
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MissingExecutive",
            sortKey: 12
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "SignMethodInconsistent",
            sortKey: 13
        }
    ]
};

// Platform enumerations
export const entityCategories = {
    enumHeader: {
        enumCode: "entityCategory",
        description: "Solution layers according to CQRS approach"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Query",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Request",
            sortKey: 2
        }
    ]
};

export const technicalStates = {
    enumHeader: {
        enumCode: "technicalState",
        description: "Technical states of documents and entities"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Active",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Inactive",
            sortKey: 2
        }
    ]
};

export const sortingOrders = {
    enumHeader: {
        enumCode: "sortingOrder",
        description: "Sorting orders"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Ascending",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "Descending",
            sortKey: 2
        }
    ]
};

export const entitlementTemplateTypes = {
    enumHeader: {
        enumCode: "entitlementTemplateType",
        description: "Types of entitlement template"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "DefaultSet",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MinimalSet",
            sortKey: 2
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "MaximalSet",
            sortKey: 3
        }
    ]
};

export const entitlementUsageTypes = {
    enumHeader: {
        enumCode: "entitlementUsageType",
        description: "Types of usege of entitled functions"
    },
    values: [
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "DirectUsage",
            sortKey: 1
        },
        {
            valueUsage: "CanBeEntered",
            keyPlatform: "OnBehalfOf",
            sortKey: 2
        }
    ]
};
