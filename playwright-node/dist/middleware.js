"use strict";
const loggerMiddleware = (req, res, next) => {
    const logDetails = {
        timestamp: new Date().toDateString(),
        method: req.method,
        body: req.body,
    };
    // Log the details with INFO prefix
    console.log("INFO\t", logDetails);
    next();
};
const errorHandlerMiddleware = (err, req, res, next) => {
    const errDetails = {
        timestamp: new Date().toDateString(),
        err,
    };
    // Log the details with ERROR prefix
    console.error("ERROR\t", errDetails);
    res.status(500).json({ error: "Internal Server Error" });
};
module.exports = { loggerMiddleware, errorHandlerMiddleware };
