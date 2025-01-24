"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const { loggerMiddleware, errorHandlerMiddleware } = require("./middleware");
const router = require("./routes");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const localhost = process.env.LOCALHOST;
const corsConfig = {
    origin: localhost, // Allowed origins
    methods: "POST",
    credentials: false,
};
// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors(corsConfig));
// Routes
app.use("/api", router);
app.use(errorHandlerMiddleware);
// Start the server
app.listen(PORT, () => {
    console.log(`INFO\tStarting server on port ${PORT}...`);
});
