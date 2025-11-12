import { getAllProducts, getProductsBySlug, getProductById, getAllSlugs } from '../models/productmodel.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

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

