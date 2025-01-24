"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = exports.loggerMiddleware = void 0;
// loggerMiddleware() logs a request with the timestamp,
// specifying method and body of the request
var loggerMiddleware = function (req, res, next) {
    var logDetails = {
        timestamp: new Date().toDateString(),
        method: req.method,
        body: req.body,
    };
    // Log the details with INFO prefix
    console.log("INFO\t", logDetails);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
// errorHandlerMiddleware() logs a error with a timestamp,
// and sends Internal Server Error error to the user
var errorHandlerMiddleware = function (err, req, res, next) {
    var errDetails = {
        timestamp: new Date().toDateString(),
        err: err,
    };
    // Log the details with ERROR prefix
    console.error("ERROR\t", errDetails);
    res.status(500).json({ error: "Internal Server Error" });
    next();
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
