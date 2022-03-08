export const APIcatalog= {
    operations: [
        {
            functionName: "frameContract",
            summary: "frame contract model",
            description: "Creates the client contact data inside the frame contract document.",
            tags: ["Frame Contract"],
            method: "put",
            request: {
                schema: "contractualDocumentDocumentSchema",
                schemaVersion: "1.0.0",
            },
            responses: [
                {
                    HTTPStatusCode: "200",
                    description: "Response Object",
                    schema: "contractualDocumentDocumentSchema",
                    schemaVersion: "1.0.0",
                }
            ]
        }
    ]
};
