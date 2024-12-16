const bcrypt = require("bcryptjs");

const saltRounds = 10;

const hashPassworded = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// Compare the password with the hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

module.exports = { hashPassworded, comparePassword };
