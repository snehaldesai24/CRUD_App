import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import cors from "cors";
import UserRouter from "./routes/UserRoutes.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Static file serving
app.use("/uploadImages", express.static(path.join(path.resolve(), "uploadImages")));

// Routes
app.use("/api", UserRouter);

// Test route
app.get("/test", (req, res) => {
    res.send("Server is running");
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
