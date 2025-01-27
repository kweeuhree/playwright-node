import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { loggerMiddleware, errorHandlerMiddleware } from "./middleware";
import { router } from "./routes";

dotenv.config();

// Initialize an express app
const app = express();

// Define port
const PORT = process.env.PORT || 3000;

// Define allowed origins: localhost for development, render for production
const allowedOrigins = [process.env.LOCALHOST, process.env.REACT_ON_RENDER];

// Set up cors config
const corsConfig: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,POST",
  credentials: false,
};

// Serve static files
app.use(express.static("./static/dist"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/api", router);

// Use error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`INFO\tStarting server on port ${PORT}...`);
});
