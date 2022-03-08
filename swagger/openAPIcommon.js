export const openAPIcommon = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "dig-it-ally Contracts"
    },
    servers: [{
        url: "https://dia-platform.azure-api.net/dia-platform-contract",
        description: "dig-it-ally platform contract api functions"
    }],
    paths: {},
    security: [{
        apiKey: []
    }
    ],
    components: {
        securitySchemes: {
            apiKey: {
                type: "apiKey",
                in: "query",
                name: "code"
            }
        }
    }
};
