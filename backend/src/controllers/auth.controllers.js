import bcrypt from "bcryptjs";
import { UserModel } from "../models/auth.model.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { full_name, email, password, phone } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await UserModel.create({
      full_name,
      email,
      password: hashedPassword,
      phone,
    });

    return res.json({
      message: "Register success",
      userId,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.is_active === 0) {
      return res.status(403).json({ message: "Account is disabled" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(user);

    return res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
