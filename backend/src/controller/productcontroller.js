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
import { getProductsBySlug, getProductById, getAllSlugs } from '../models/productmodel.js';

// Ge

// Get products by category (slug)
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await getProductsBySlug(category);
    
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found or no products in this category'
      });
    }

    // Generate title from category name
    const title = category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    res.status(200).json({
      success: true,
      data: {
        title,
        products: products.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.image,
          quantity: p.quantity,
          description: p.description,
          company: p.company,
          category: p.category,
          details: p.details
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// Get single product by ID
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// Get all available categories (slugs)
export const getCategories = async (req, res) => {
  try {
    const categories = await getAllSlugs();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

