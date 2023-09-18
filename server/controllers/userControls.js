import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const SECRTE_KEY = "E-Commerce";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Does Not Exist" });
    }
    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// export const isAuthenticated = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) return res.status(404).json({ message: "Login First" });

//   const decoded = Jwt.verify(token, SECRTE_KEY);

//   req.user = await User.findById(decoded._id);

//   next();
// };
