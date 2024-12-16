const router = require("express").Router();
const FormDataModel = require("../models/FormData");
const { hashPassworded } = require("../bycrpt/index");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await FormDataModel.findOne({ email });
    if (user) {
      return res.status(400).json("User already registered");
    }

    const hashedPassword = await hashPassworded(password);

    const newUser = await FormDataModel.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;
