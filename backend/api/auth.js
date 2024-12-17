const router = require("express").Router();
const FormDataModel = require("../models/FormData");
const { encode } = require("../jwt/index");
const { comparePassword } = require("../bycrpt/index");

router.post("/login", async (req, res) => {
  try {
    console.log(req, req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const exist = await FormDataModel.findOne({ email });
    if (!exist) {
      return res.status(500).json({ error: "User not found" });
    }
    if (!exist.password) {
      console.error("User record is missing the password field");
      return res.status(500).json({ error: "Server error: invalid user data" });
    }

    const isMatch = await comparePassword(password, exist.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }
    const payload = { user: { id: exist._id } };

    const token = await encode(payload);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/protected-route", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const payload = await decode(token);
    if (!payload) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res
      .status(200)
      .json({ message: "Protected route accessed successfully" });
  } catch (error) {
    console.error("Protected route error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
