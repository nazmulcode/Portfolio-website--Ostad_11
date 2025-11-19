import authConfigs from "../config/auth.config.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.create({ email, password });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Login User
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "email or password are not correct",
      });
    }

    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({
        message: "email or password are not correct",
      });
    } else {
      const token = authConfigs.encodeToken(user.email, user._id.toString());
      res.cookie("user-token", token);
      res.status(200).json({
        success: true,
        message: "Successfully LoggedIn",
        user: {
          id: user._id,
          email: user.email,
        },
        token: token,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error,
      message: "something went wrong",
    });
  }
};

const userControllers = { userRegister, userLogin };

export default userControllers;
