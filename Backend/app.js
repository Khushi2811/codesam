const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const cors = require("cors"); // Import CORS

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the frontend React app
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
  })
);

// Example root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use authentication routes
app.use("/api/auth", authRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred", error: err.message });
});

module.exports = app; // Export the app instance

