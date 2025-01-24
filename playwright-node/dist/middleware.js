// loggerMiddleware() logs a request with the timestamp,
// specifying method and body of the request
export const loggerMiddleware = (req, res, next) => {
    const logDetails = {
        timestamp: new Date().toDateString(),
        method: req.method,
        body: req.body,
    };
    // Log the details with INFO prefix
    console.log("INFO\t", logDetails);
    next();
};
// errorHandlerMiddleware() logs a error with a timestamp,
// and sends Internal Server Error error to the user
export const errorHandlerMiddleware = (err, req, res, next) => {
    const errDetails = {
        timestamp: new Date().toDateString(),
        err,
    };
    // Log the details with ERROR prefix
    console.error("ERROR\t", errDetails);
    res.status(500).json({ error: "Internal Server Error" });
    next();
};
