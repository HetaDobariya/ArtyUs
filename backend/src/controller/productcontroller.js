import { addProductModel, getAllProductsModel } from '../models/productmodel.js';

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
