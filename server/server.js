// const express = require("express");
// const colors = require("colors");

// we have defined a type : module in package.json to convert into ES6 so now we can remove require and can import it directly
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"; // since we are using ES6 so we have to specify file extension also
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Convert the file URL to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = path.dirname(__filename);

// configure env file
dotenv.config();

// database config
connectDB();

// now we create rest object to create api's
const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // This middleware function parses incoming requests with JSON payloads. It parses the incoming request body, if the Content-Type header matches the type application/json, and exposes the resulting object on req.body
app.use(morgan("dev")); // This middleware function is a logger. It logs HTTP requests, including information like request method, URL, status code, response time, and more. The 'dev' option in this case configures it to log in a pre-defined format that's particularly helpful during development, providing concise but informative output.
app.use(express.static(path.resolve(__dirname, "path")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api made on home page
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the E-Commerce App</h1>");
});

// PORT  --> we can't expose the port in production so we will add it in .env file, we add all the confidential things in .env file like payment gateway link, mongo db link, etc
const PORT = process.env.PORT || 8080; // env me se process karke PORT ka value nikalo

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// run listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`.bgCyan);
});
