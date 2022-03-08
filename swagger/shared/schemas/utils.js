import jsonata from 'jsonata';

// apply function 'f' on every item of the type 'string' in the object 'o'
export const deepTransform = (o, v, f) => {
    Object.keys(o).forEach((k) => {
        if (o[k] !== null && typeof o[k] === 'object') {
            deepTransform(o[k], v, f);
            return;
        }
        if (typeof o[k] === 'string' && o[k] === v) {
            o[k] = f();
        }
    });
};

export const contextResponse = (context, status, body) => {
    if (status) {
        context.res = {status};
        if (body) {
            context.res.body = body;
            if (body.errorMessage) {
                context.log.error(body.errorMessage);
            }
            if (typeof body === "object") {
                context.res.headers = {'Content-Type': 'application/json'};
            }
        }
    }
    return status === 200;
};

/**
 * @param context
 * @param [status] - may be error added before directly into context
 * @param [body]
 * @returns {boolean}
 */
export const contextDone = (context, status, body) => {
    contextResponse(context, status, body);
    return context.done();
};

export const jsonTransform = (data, jsonataRuleObj, message, context) => {
    try {
        const responseTransformation = jsonata(jsonataRuleObj);
        const responseData = responseTransformation.evaluate(data);
        return responseData;
    } catch (e) {
        contextResponse(context, 400, {
            errorMessage: `${message} transformation failed, ${e}`,
            dataToTransform: data,
            jsonataRuleObj
        });
        return null;
    }
};
