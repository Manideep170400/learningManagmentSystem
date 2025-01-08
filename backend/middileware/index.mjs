import jwt from "../jwt/index.mjs";
const { decode } = jwt;
const HEADER_AUTH_KEY = "x-auth-token";
const jwtMiddleware = async (req, res, next) => {
  try {
    const token = await req.header(HEADER_AUTH_KEY);
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }
    let data = decode(token);
    if (!data) {
      return res.status(500).json({ error: "Invalid token" });
    }
    req.user = data.user;
    await next();
  } catch (error) {
    console.error("Protected route error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default jwtMiddleware;
