import { userDetais, traderDetails, updateUserById, deleteUserById, updateTraderById, deleteTraderById, addslugsbyname  } from "../models/adminModel.js";

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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await updateUserById(id, data);
    res.status(200).json({ success: true, message: "User updated successfully", data: result });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Error updating user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Error deleting user", error: error.message });
  }
};


export const getAllTraders = async (req, res) => {
  try {
    const traders = await traderDetails(); 

    if (!traders || traders.length === 0) {
      return res.status(404).json({ message: "No verified traders found" });
    }

    res.status(200).json({
      success: true,
      count: traders.length,
      data: traders,
    });
  } catch (error) {
    console.error("Error fetching traders:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching traders",
      error: error.message,
    });
  }
};

export const updateTrader = async (req, res) => {
  try {
    const { id } = req.params; 
    const data = req.body;
    const result = await updateTraderById(id, data);
    res.status(200).json({ success: true, message: "Trader updated successfully", data: result });
  } catch (error) {
    console.error("Error updating trader:", error);
    res.status(500).json({ success: false, message: "Error updating trader", error: error.message });
  }
};

export const deleteTrader = async (req, res) => {
  try {
    const { id } = req.params; 
    await deleteTraderById(id);
    res.status(200).json({ success: true, message: "Trader deleted successfully from both tables" });
  } catch (error) {
    console.error("Error deleting trader:", error);
    res.status(500).json({ success: false, message: "Error deleting trader", error: error.message });
  }
};

export const addSlugs = async (req,res) => {
  try {
    const {category_name, slug_name} = req.body;

    if(!category_name || !slug_name){
      return res.status(400).json({error: "Category_name and Slug_name are required"});
    }

    const result = await addslugsbyname(category_name,slug_name);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Something went Wrong!!' });
    }

    res.status(200).json({ message: 'Category added successfully' });
  }
  catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

