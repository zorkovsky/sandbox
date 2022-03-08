export const createQuery = ({context, cfg: {stepConfig: {selectDefinition}}, functionName}, queryParams) => {
    context.log(`${functionName} createQuery for ${JSON.stringify(selectDefinition)} and ${JSON.stringify(queryParams)}`);

    let sqlWhere = "";
    const sqlParameters = [];
    for (const filteringAttribute of selectDefinition.filterDefinition.filteringAttributes) {
        if (queryParams[filteringAttribute.name]) {
            sqlWhere += (`${sqlWhere ? " WHERE" : " AND"} (${filteringAttribute.whereAttribute} = @${filteringAttribute.name})`);
            sqlParameters.push({
                name: `@${filteringAttribute.name}`, 
                value: queryParams[filteringAttribute.name]
            });
        }
    }

    for (const subqueryFilter of selectDefinition.filterDefinition.subqueryFilters) {
        if (subqueryFilter.type === 'Exists') {
            let sqlSubquery = "";
            for (const subqueryFilteringAttribute of subqueryFilter.filteringAttributes) {
                if (queryParams[subqueryFilteringAttribute.name]) {
                    sqlSubquery += (`${sqlSubquery ? " WHERE" : " AND"} (${subqueryFilteringAttribute.whereAttribute} =@${subqueryFilteringAttribute.name})`);
                    sqlParameters.push({name: `@${subqueryFilteringAttribute.name}`, value: queryParams[subqueryFilteringAttribute.name]});
                }
            }
            if (sqlSubquery.length > 0) {
                sqlWhere += 
                    `${(sqlWhere.length === 0) ? " WHERE" : " AND"} 
                    EXISTS (
                        SELECT VALUE ${subqueryFilter.collectionAlias} 
                        FROM ${subqueryFilter.collectionAlias} IN ${subqueryFilter.Collection}${sqlSubquery})`;
            }
        }
    }

    return {
        query: selectDefinition.sqlCore + sqlWhere,
        parameters: sqlParameters
    };
};
