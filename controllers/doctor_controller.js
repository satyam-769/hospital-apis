import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register the doctor
const create = async function (req, res) {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(409).json({
        message: "UserName Already Exists",
      });
    }

    user = await User.create({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      type: "Doctor",
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Create a session when doctor login
const createSession = async function (req, res) {
  try {
    let user = await User.findOne({ username: req.body.username });

    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid UserName or Password",
      });
    }

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

    return res.status(200).json({
      message: "Sign in successful. Here is your token, please keep it safe",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export {
  create,
  createSession,
}