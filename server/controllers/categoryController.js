import Category from '../models/Category.js';

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      ...(req.query.status && { status: req.query.status })
    }).sort({ createdAt: -1 });
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({
      name: name.trim(),
      description,
      icon
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, icon, status } = req.body;
    
    // Check if category exists
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if new name already exists (if name is being updated)
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name: name.trim() });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
    }

    // Update fields
    if (name) category.name = name.trim();
    if (description) category.description = description;
    if (icon) category.icon = icon;
    if (status) category.status = status;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Soft delete category
export const deactivateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.status = 'inactive';
    await category.save();

    res.json({ message: 'Category deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hard delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.deleteOne({ _id: req.params.id });
    res.json({ message: 'Category permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};