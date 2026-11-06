import User from "../models/User.js";
import jwt from "jsonwebtoken";
//Register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    // res.status(500).json({ message: "Server error" });
      console.error("REGISTER ERROR:", err);

  res.status(500).json({
    message: "Server error",
  });
  }
};
// export const register = async (req, res) => {
//   console.log("========== REGISTER ==========");
//   console.log("Content-Type:", req.headers["content-type"]);
//   console.log("Body:", req.body);

//   res.status(200).json({
//     message: "Test successful",
//     body: req.body,
//   });
// };

//login

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    // res.status(500).json({ message: "Server error" });
      console.error("LOGIN ERROR:", err);
  res.status(500).json({ message: "Server error" });
  }
};

//Me
export const me = async (req, res) => {
  res.status(200).json(req.user);
};
//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
