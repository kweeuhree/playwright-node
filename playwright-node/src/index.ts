import express from "express";
import cors from "cors";
import { loggerMiddleware, errorHandlerMiddleware } from "./middleware";
import { router } from "./routes";
require("dotenv").config();

// Initialize an express app
const app = express();

// Define port
const PORT = process.env.PORT || 3000;
const localhost = process.env.LOCALHOST;

// Set up cors config
const corsConfig = {
  origin: localhost, // Allowed origins
  methods: "POST",
  credentials: false,
};

// Serve static files
app.use(express.static("static"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors(corsConfig));

// Routes
app.use("/api", router);

// Use error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`INFO\tStarting server on port ${PORT}...`);
});
