import pkg from "bcryptjs";
const { genSalt, hash, compare } = pkg;

const saltRounds = 10;

const hashPassworded = async (password) => {
  try {
    const salt = await genSalt(saltRounds);
    return await hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// Compare the password with the hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

export { hashPassworded, comparePassword };
