"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var middleware_1 = require("./middleware");
var routes_1 = require("./routes");
dotenv_1.default.config();
// Initialize an express app
var app = (0, express_1.default)();
// Define port
var PORT = process.env.PORT || 3000;
// Define allowed origins: localhost for development, render for production
var allowedOrigins = [process.env.LOCALHOST, process.env.REACT_ON_RENDER];
// Set up cors config
var corsConfig = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,POST",
    credentials: false,
};
// Serve static files
app.use(express_1.default.static("./static/dist"));
// Middlewares
app.use(express_1.default.urlencoded({ extended: true }));
app.options("*", (0, cors_1.default)(corsConfig));
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use(middleware_1.loggerMiddleware);
// Routes
app.use("/api", routes_1.router);
// Use error handling middleware
app.use(middleware_1.errorHandlerMiddleware);
// Start the server
app.listen(PORT, function () {
    console.log("INFO\tStarting server on port ".concat(PORT, "..."));
});
