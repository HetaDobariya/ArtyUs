import { addProductModel, getAllProductsModel, updateProductById, deleteProductById, getProductsByTraderIdModel } from '../models/productmodel.js';

export const addProduct = async (req, res) => {
  try {
    const { slug_id, product_name, qty, price, description, image_url } = req.body;

    const trader_id = req.user?.trader?.trader_id;
   

    if (!trader_id) {
      return res.status(403).json({ error: 'Unauthorized: trader not found in token' });
    }

    if (!slug_id || !product_name || !qty || !price || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await addProductModel({
      slug_id,
      trader_id,
      product_name,
      qty,
      price,
      description,
      image_url: image_url || '',
    });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product_id: result.insertId,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsModel();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty, price, description } = req.body;

    // Validate input
    if (!qty || !price || !description) {
      return res.status(400).json({ error: "qty, price, and description are required" });
    }

    const result = await updateProductById(id, { qty, price, description });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found or no changes made" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteProductById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getProductsByTraderId = async (req, res) => {
  try {
    // Get trader_id from token (or you can send it manually in query/body for now)
    const trader_id = req.user?.trader?.trader_id;

    if (!trader_id) {
      return res.status(400).json({ error: "Trader ID not found in token or request" });
    }

    const products = await getProductsByTraderIdModel(trader_id);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching trader products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};