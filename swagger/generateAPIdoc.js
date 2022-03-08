import {promises as fs} from 'fs';
import j2s  from 'joi-to-swagger';
import {stringify as yamlStringify} from 'json2yaml';

import {APIcatalog} from './APIcatalog';
import {openAPIcommon} from './openAPIcommon';
// import requestContractSchema from './shared/schemas/request/frameContractSchemas';
import responseContractSchema from './shared/schemas/response/frameContractSchemas';
import requestCompanyRegistrySchema from './shared/schemas/request/companyRegistrySchemas';
import responseCompanyRegistrySchema from './shared/schemas/response/companyRegistrySchemas';
import modelContractSchema from './shared/schemas/model/frameContractSchemas';

// get the general OAS3 OpenAPI Object sections
const openAPI = openAPIcommon;

// add operations from API catalog to OAS3 Paths Object
openAPI.paths = APIcatalog.operations.reduce((operations, operation) => {
    operations[`/${operation.functionName}`] = {};
    operations[`/${operation.functionName}`][operation.method] = {
        summary: operation.summary,
        tags: operation.tags,
        description: operation.description,
        requestBody: {
            content: {
                'application/json': {
                    schema: j2s(operation.request.module === 'companyRegistrySchemas' ? 
                        requestCompanyRegistrySchema[operation.request.schema][operation.request.schemaVersion] :
                        modelContractSchema[operation.request.schema][operation.request.schemaVersion]
                    ).swagger
                }
            }
        },
        responses: operation.responses.reduce((responses, response) => {
            responses[response.HTTPStatusCode] = {
                description: response.description,
                content: {
                    'application/json': {
                        schema: j2s(response.module === 'companyRegistrySchemas' ? 
                            responseCompanyRegistrySchema[response.schema][response.schemaVersion] :
                            modelContractSchema[response.schema][response.schemaVersion]
                        ).swagger
                    }
                }
            };
            return responses;
        }, {})
    };
    return operations;
}, {});

(async () => {
    await fs.writeFile('./APIdoc.yaml', yamlStringify(openAPI));
})();

console.log("OpenAPI documentation generated.");
