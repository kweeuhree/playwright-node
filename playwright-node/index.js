// import { loggerMiddleware, errorHandlerMiddleware } from "./middleware";

const express = require("express");
const app = express();
const { loggerMiddleware, errorHandlerMiddleware } = require("./middleware");
const router = require("./routes");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/api", router);

app.use(errorHandlerMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}...`);
});
