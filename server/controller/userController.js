import { userModel } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const jwt = process.env.SECRET_KEY
export const SECRET_KEY =
  "my name is shubham tiwari.I use the chatGPT for learning the concepts and clearing it.";

const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password === confirmPassword) {
    try {
      const userExist = await userModel.findOne({ email: email });
      if (userExist) {
        res.status(400).json({ message: "User already exist." });
        return;
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const addUser = new userModel({
        username: username,
        email: email,
        password: hashPassword,
      });
      await addUser.save();
      res.status(200).json({ message: "User added succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Technical error." });
      return;
    }
  } else {
    res.status(400).json({ message: "Password doesn't match." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userModel.findOne({ email: email });
    if (!checkUser) {
      res.status(400).json({ message: "User doesn't exists." });
      return;
    }

    const checkHashPassword = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkHashPassword) {
      res.status(400).json({ message: "Invalid Password." });
      return;
    }
    const token = jwt.sign(
      {
        username: checkUser.username,
        userID: checkUser._id,
        email: checkUser.email,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login now.", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error from login" });
  }
};

const validUser = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    res.status(200).json({ message: "Valid user", decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid user." });
  }
};

export { signup, login, validUser };
