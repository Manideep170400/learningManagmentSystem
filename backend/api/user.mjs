import { Router } from "express"; 
import { hashPassworded } from "../bycrpt/index.mjs";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, role, name } = req.body;

  try {
    if (!email || !password) {
      return res.status(500).json("Email and password are required");
    }
    if (!role) {
      return res.status(500).json("Role is required");
    }
    const user = await findOne({ email });
    if (user) {
      return res.status(400).json("User already registered");
    }

    const hashedPassword = await hashPassworded(password);

    const newUser = await create({
      email,
      password: hashedPassword,
      role,
      name,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json("Internal server error");
  }
});

export default router;
