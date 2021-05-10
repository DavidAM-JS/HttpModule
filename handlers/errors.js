const notFound = (request, response) => {
    response.statusCode = 404;
    return response.end(JSON.stringify({
        message: '404-Resource not found'
    }));
}

const badRequest = (request, response) => {
    response.statusCode = 400;
    return response.end(JSON.stringify({
        message: '400-Wrong query parameter or the value has to be a number'
    }));
}

const numberNoExist = (req, res) => {
    res.statusCode = 404;
    return res.end(JSON.stringify({
        message: '404- There is no value stored!'
    }));
};

module.exports ={
    notFound,
    numberNoExist,
    badRequest
}