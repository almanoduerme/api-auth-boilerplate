import bcrypt from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export { hashPassword };
