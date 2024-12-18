const router = require("express").Router();
const FormDataModel = require("../models/FormData");
const { encode, decode } = require("../jwt/index");
const { comparePassword } = require("../bycrpt/index");
const jwtMiddleware = require("../middileware/index");

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    // console.log("role", role);
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const exist = await FormDataModel.findOne({ email });
    console.log("login", exist);
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
    const payload = {
      user: {
        id: exist._id,
        role: exist.role,
      },
    };
    const role = exist.role;
    // if (role === "admin") {
    //   return res.status(200).json({ role });
    // }
    // if (role === "instructor") {
    //   return res.status(200).json({ role });
    // }
    // if (role === "student") {
    //   return res.status(200).json({ role });
    // }
    const token = await encode(payload);

    return res
      .status(200)
      .json({ token, role, name: exist.name, email: exist.email });
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

router.get("/user", jwtMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(403).json({ error: "Invalid token" });
    }
    const exist = await FormDataModel.findById(req.user.id);
    if (!exist) {
      return res.status(500).json({ error: "User not found" });
    }
    console.log("/user", exist);
    res.status(200).json({
      name: exist.name,
      email: exist.email,
      role: exist.role,
    });
  } catch (error) {
    console.error("Error in GET /admin-route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/admin-route", jwtMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }
    const exist = await FormDataModel.findById(req.user.id);
    if (!exist) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(exist);
  } catch (error) {
    console.error("Error in GET /admin-route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
