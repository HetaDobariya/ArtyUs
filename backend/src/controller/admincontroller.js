import { userDetais } from "../models/adminModel.js"; // adjust path if needed

export const getAllUsers = async (req, res) => {
  try {
    const users = await userDetais(); // call model function

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
      error: error.message,
    });
  }
};


