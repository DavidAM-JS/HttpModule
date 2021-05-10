const { notFound, numberNoExist, badRequest } = require('./errors');

const number = [];

const myNumber = (request, response) => {
    switch (request.method) {
        case 'GET':
            const path = new URL(`http://${request.headers.host}${request.url}`);
            const query = parseInt(path.search.split('multiplier=')[1]);
            if (path.pathname === '/myNumber') {
                const regex = /^\d+$/;
                if (number[0] !== undefined) {
                    if (!path.search) {           //If there is no query parameters
                        response.statusCode = 200;
                        return response.end(JSON.stringify(number));
                    }
                    if (regex.test(query)) {      //If there are query parameters and are correct
                        number[0].myNumber = number[0].myNumber * query;
                        response.statusCode = 200;
                        return response.end(JSON.stringify(number));
                    } else {
                        badRequest(request, response);
                    }
                } else {
                    numberNoExist(request, response);
                }
            } else {
                notFound(request, response);
            }
            break;

        case 'POST':
            const rawBody = [];
            request.on('data', (chunk) => {
                rawBody.push(chunk);
            });
            if (request.url === '/myNumber') {
                if (number[0] === undefined) {    //If there is no value stored
                    request.on('end', () => {
                        const buffer = Buffer.concat(rawBody).toString();
                        const bodyValue = JSON.parse(buffer);
                        if (typeof bodyValue.myNumber === 'number') {
                            number.push(bodyValue);
                            response.statusCode = 201;
                            return response.end(JSON.stringify({
                                message: 'Number has been created created'
                            }));
                        } else {
                            badRequest(request, response);
                        }
                    });
                } else {      //If there is already a value stored
                    request.on('end', () => {
                        const buffer = Buffer.concat(rawBody).toString();
                        console.log(buffer);
                        const bodyValue = JSON.parse(buffer);
                        if (typeof bodyValue.myNumber === 'number') {
                            number[0].myNumber = bodyValue.myNumber;
                            response.statusCode = 200;
                            return response.end(JSON.stringify({
                                message: 'Number has been updated'
                            }));
                        } else {
                            badRequest(request, response);
                        }
                    });
                }
            } else {
                notFound(request, response);
            }
            break;

            default:
                notFound(request, response);
                break;
    }
}

const resetMyNumber = (request, response) => {
    if (request.method === 'DELETE' && request.url === '/reset') {
        if (number[0] !== undefined) {
            number.pop();
            response.statusCode = 200;
            return response.end(JSON.stringify({
                message: 'The value has been deleted'
            }));
        }
        return numberNoExist(request, response);
    }
   notFound(request, response);
}

module.exports = {
    myNumber,
    resetMyNumber,
    notFound
};
