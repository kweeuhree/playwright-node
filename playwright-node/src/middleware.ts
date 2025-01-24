import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logDetails = {
    timestamp: new Date().toDateString(),
    method: req.method,
    body: req.body,
  };

  // Log the details with INFO prefix
  console.log("INFO\t", logDetails);

  next();
};

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errDetails = {
    timestamp: new Date().toDateString(),
    err,
  };

  // Log the details with ERROR prefix
  console.error("ERROR\t", errDetails);
  res.status(500).json({ error: "Internal Server Error" });
  next();
};
