import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import authRoutes from "./api/auth.mjs";
import userRoutes from "./api/user.mjs";
import adminRoutes from "./api/admin.mjs";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
connect(
  "mongodb+srv://PMK:PMK123@cluster0.0de231b.mongodb.net/PMK?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

// Start Server
app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});
