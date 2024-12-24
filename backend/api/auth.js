const router = require("express").Router();
const crypto = require("crypto");
const FormDataModel = require("../models/FormData");
const Otp = require("../models/userOtpVerification");
const { encode, decode } = require("../jwt/index");
const { comparePassword } = require("../bycrpt/index");
const jwtMiddleware = require("../middileware/index");
const transporter = require("../nodeMailer");

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

router.post("/otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    // Send OTP via email
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    });

    console.log("OTP sent successfully");

    // Save OTP to the database
    const user = await FormDataModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newOtp = new Otp({
      userId: user._id,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5 minutes
    });

    await newOtp.save();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP" });
  }
});

// verify otp
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const user = await FormDataModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const otpRecord = await Otp.findOne({ userId: user._id, otp });
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP", error });
  }
});

module.exports = router;
