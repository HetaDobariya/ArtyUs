// controller/usercontroller.js
import { getAllCategories, getchildCategories , getslugs, updateSlugById, deleteSlugById} from "../models/categorymodel.js";

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

export const slugs = async (req, res) => {
  try {
    const slugs = await getslugs();

    if (!slugs || slugs.length === 0) {
      return res.status(404).json({ message: "No Slugs found" });
    }

    res.status(200).json({
      success: true,
      data: slugs,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateSlug = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Slug name is required" });
    }

    const result = await updateSlugById(id, name);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Slug not found or no changes made" });
    }

    res.status(200).json({ message: "Slug updated successfully" });
  } catch (error) {
    console.error("Error updating slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete slug
export const deleteSlug = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteSlugById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Slug not found" });
    }

    res.status(200).json({ message: "Slug deleted successfully" });
  } catch (error) {
    console.error("Error deleting slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

