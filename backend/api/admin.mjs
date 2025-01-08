import { Router } from "express";
const router = Router();


router.post("/admin", async (req, res) => {
  try {
    const existAdmin = await findOne({ email: "lmsadmin@gmail.com" });
    if (!existAdmin) {
      const newAdmin = await create({
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

export default router;
