const express = require('express');
const { createCategory, getCategories, getOneCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

router
    .route('/')
    .post(createCategory)
    .get(getCategories);

router
    .route('/:id')
    .get(getOneCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;