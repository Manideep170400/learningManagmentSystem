import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

const SECRET_KEY = "jwtSecurity";
const expiresIn = "1h";

 const encode = (payload) => {
  try {
    const token = sign(payload, SECRET_KEY, { expiresIn });
    console.log(token);
    return token;
  } catch (error) {
    console.error(error);
  }
};
 const decode = (token) => {
  try {
    return verify(token, SECRET_KEY);
  } catch (error) {
    console.error("Invalid token:", error);
    throw error;
  }
};

export default {encode,decode}
