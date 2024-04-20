import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

dotenv.config();



const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        num_telephone: user.num_telephone,
        code_paiement: user.code_paiement,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    req.user = {
      _id: user._id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      num_telephone: user.num_telephone,
      code_paiement: user.code_paiement,
      credit: user.credit,
      role: user.role,
      token,
    };
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { nom, prenom, email, password, num_telephone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const code_paiement = Math.floor(1000 + Math.random() * 9000);

    const newUser = new User({
      nom,
      prenom,
      email,
      password: hashedPassword,
      num_telephone,
      code_paiement,
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amrin0865@gmail.com",
        pass: "yijxnjymlnixmjew",
      },
    });
    const CP = "Votre code de paiment est : " + code_paiement;
    const mailOptions = {
      from: "amrin0865@gmail.com",
      to: email,
      subject: "Code paiment",
      text: CP,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const decrementUserCredit = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found` });
    }

    // Decrement user's credit by 1
    user.credit -= 1;

    // Save the updated user object
    await user.save();

    res
      .status(200)
      .json({ message: "User credit decremented successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to decrement user credit" });
  }
};

export {
  login,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  decrementUserCredit,
};
