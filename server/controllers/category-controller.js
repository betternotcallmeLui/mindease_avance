const CategoryModel = require("../models/CategoryModel");

exports.createCategory = async (req, res) => {
  let { category } = req.body;

  try {
    const isCategoryExist = await CategoryModel.findOne({ category });
    if (isCategoryExist !== null) {
      return res
        .status(500)
        .json({ error: "Ya existe una categoría con ese nombre." });
    }
    category = category.charAt(0).toUpperCase() + category.slice(1);

    const newCategory = await new CategoryModel({
      category,
    });
    await newCategory.save();
    res
      .status(201)
      .json({ success: true, message: "Categoría creada de forma exitosa." });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría." });
  }
};

exports.createSubcategory = async (req, res) => {
  const { category, subcategory } = req.body;

  try {
    const existingCategory = await CategoryModel.findOne({ category });
    if (!existingCategory) {
      return res.status(404).json({ message: "Categoría no encontrada." });
    }
    const existingSubCategory = await CategoryModel.findOne({ subcategory });
    if (existingSubCategory !== null) {
      return res
        .status(500)
        .json({ message: "Ya existe una subcategoría con ese nombre." });
    }

    existingCategory.subcategory.push(subcategory);
    await existingCategory.save();
    res.status(200).json({ message: "Subcategoría creada de forma exitosa." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la categoría.", error: error.message });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await CategoryModel.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
