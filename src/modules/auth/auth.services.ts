import { comparePassword } from "../../libs/bcryptjs/compare.bcrypt";
import { hashPassword } from "../../libs/bcryptjs/hash.bcrypt";
import { UserModel } from "./auth.model";

class UserService {
  static async login(userData: { email: string, password: string }) {
    const { email, password } = userData;

    // Check if the user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password is correct
    const isPasswordCorrect = await comparePassword(password, user.password);
    
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }

    // Return the user
    return user;
  }

  static async register(userData: { username: string, email: string, password: string, role: string }) {
    const { username, email, password, role } = userData;

    // Check if the user already exists
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = await UserModel.create({ username, email, password: hashedPassword, role });

    // Return the user
    return user;
  }
}

export { UserService };
