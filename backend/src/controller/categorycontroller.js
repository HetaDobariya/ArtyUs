// controller/usercontroller.js
import { getAllCategories, getchildCategories } from "../models/categorymodel.js";

export const category = async (req, res) => {
  try {
    const categories = await getAllCategories();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const childCategory = async (req, res) => {
  try {
    const categories = await getchildCategories();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};