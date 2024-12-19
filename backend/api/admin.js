const express = require("express");
const router = express.Router();
const Admin = require("../models/admin.models");

router.post("/admin", async (req, res) => {
  try {
    const existAdmin = await Admin.findOne({ email: "lmsadmin@gmail.com" });
    if (!existAdmin) {
      const newAdmin = await Admin.create({
        email: "lmsadmin@gmail.com",
        password: "admin@123",
      });
      return res.status(200).json({
        message: "Admin created successfully",
        data: newAdmin,
      });
    }

    return res.status(200).json({
      message: "Admin already exists",
      data: existAdmin,
    });
  } catch (error) {
    console.error("Error handling admin route:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
