export const getActiveParty = async (dbClient, context, partyId, functionAppConfig) => {
    context.log(`Getting party: partyId = ${partyId}`);
    try {
        const sqlStatement = `SELECT * FROM d WHERE d.id = @partyId AND d.documentHeader.technicalState = "Active"`;
        const sqlParameters = [{
            name: '@partyId', 
            value: partyId
        }];
        const {resources: items} = await dbClient
            .database(functionAppConfig.databaseDefinition.database)
            .container('Parties').items
            .query({
                query: sqlStatement, 
                parameters: sqlParameters
            })
            .fetchAll();
        if (items.length !== 1) {
            context.log.error(`Party fetch error - ${items.length === 0 ? "No active entity exists" : "Too many entities exist"}`);
            return null;
        }
        const [doc] = items;
        return doc;
    } catch (e) {
        context.log.error(`Party db read operation failed, ${e}`);
        return null;
    }
};

export const getValidPartyRoles = (context, party, partyRoleReference, partyIdentifier={}) => {
    context.log(`
        Get valid and active party roles for a party:
            partyId = ${partyRoleReference.partyId};
            partyRoleId = ${partyRoleReference.partyRoleId};
            partyRoleType = ${partyRoleReference.partyRoleType};
            identifierType = ${partyIdentifier.partyIdentifierType};
            identifierValue = ${partyIdentifier.partyIdentifierValue}`
    );

    if (party.id !== partyRoleReference.partyId) {
        context.log.error(
            `getValidPartyRoles - wrong party provided, partyId ${party.id} not equal to partyRoleReference.partyId ${partyRoleReference.partyId}`);
        return null;
    }

    const {documentData: {partyIdentifiers = [], partyRoles = []}} = party;
    const validPartyRoles = partyRoles.map(partyRole => {
        if (partyRole.elementHeader.technicalState === 'Active' && 
            partyRole.elementHeader.id === partyRoleReference.partyRoleId &&
            partyRole.partyRoleType === partyRoleReference.partyRoleType) {
            if (partyIdentifier.partyIdentifierType && partyIdentifier.partyIdentifierValue) {
                const validPartyIdentifiers = partyIdentifiers.filter(pi =>
                    pi.partyIdentifierType === partyIdentifier.partyIdentifierType &&
                    pi.partyIdentifierValue === partyIdentifier.partyIdentifierValue &&
                    pi.elementHeader.technicalState === 'Active' &&
                    partyRole.partyRoleIdentifiers.find(
                        pri => pri.elementHeader.technicalState === 'Active' && pri.refElementId === pi.elementHeader.id
                    )
                );
                if (validPartyIdentifiers.length) {
                    return {
                        ...partyRole,
                        validPartyIdentifiers
                    };
                }
                return null;
            }
            // return all valid pary identifiers for this party role
            const validPartyIdentifiers = partyIdentifiers.filter(pi =>
                pi.elementHeader.technicalState === 'Active' &&
                partyRole.partyRoleIdentifiers.find(
                    pri => pri.elementHeader.technicalState === 'Active' && pri.refElementId === pi.elementHeader.id
                )
            );
            return {
                ...partyRole,
                validPartyIdentifiers
            };
        }
        return null;
    }).filter(o => o !== null);

    if (!validPartyRoles.length) {
        context.log.error(`No valid party roles exist for ${partyRoleReference.partyId} and ${partyRoleReference.partyRoleId}`);
        return null;
    }

    return validPartyRoles;
};
