const jwt = require("jsonwebtoken");

const SECRET_KEY = "jwtSecurity";

const expiresIn = "1h";

const encode = (payload) => {
  try {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn });
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const decode = (token) => jwt.verify(token, SECRET_KEY);
module.exports = { encode, decode };
