const http = require('http');
const handlers = require('./handlers/app');
const PORT = 9000;

const myRouter = (path) => {
    const routes = {
        '/myNumber': handlers.myNumber,
        '/reset': handlers.resetMyNumber,
    }

    if(routes[path]){
        return routes[path];
    }

    return handlers.notFound;
}

const server = http.createServer(function (request, response) {
    const url = new URL(`http://${request.headers.host}${request.url}`);
    const urlPath = url.pathname;
    const route = myRouter(urlPath);

    response.setHeader('Content-Type', 'application/JSON');
    return route(request, response);
});

server.listen(PORT, function () {
    console.log(`Server running at http://localhost:${PORT}`);
});