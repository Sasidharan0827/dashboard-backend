const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, Address, phone, password } = req.body;

    if (!firstName || !lastName || !email || !Address || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ msg: "Phone number already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      Address,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "Registered Successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const existingUser = await User.findOne({ phone });
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      msg: "Login successful",
      user: {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        phone: existingUser.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const editUser = req.params.userId;
    const { firstName, lastName, email, Address, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      editUser,
      { firstName, lastName, email, Address, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      msg: "User updated successfully",
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const userList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      msg: "User list retrieved successfully",
      users,
    });
  } catch {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({
      msg: "User retrieved successfully",
      user,
    });
  } catch {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
  userList,
  getUserById,
};
