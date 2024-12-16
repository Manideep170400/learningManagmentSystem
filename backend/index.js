const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./api/auth");
const userRoutes = require("./api/user");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://PMK:PMK123@cluster0.0de231b.mongodb.net/PMK?retryWrites=true&w=majority&appName=Cluster0"
);

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.listen(3001, () => {
  console.log("Server listining on http://127.0.0.1:3001");
});
