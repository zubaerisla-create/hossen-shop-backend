"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("./categories.controller");
const validate_1 = require("../../middlewares/validate");
const auth_1 = require("../../middlewares/auth");
const categories_validation_1 = require("./categories.validation");
const router = (0, express_1.Router)();
// Public routes
router.get('/', categories_controller_1.CategoriesController.getAllCategories);
router.get('/:id', (0, validate_1.validate)(categories_validation_1.categoryIdSchema), categories_controller_1.CategoriesController.getCategoryById);
// Protected routes (Admin only)
router.post('/', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(categories_validation_1.createCategorySchema), categories_controller_1.CategoriesController.createCategory);
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(categories_validation_1.updateCategorySchema), categories_controller_1.CategoriesController.updateCategory);
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(categories_validation_1.categoryIdSchema), categories_controller_1.CategoriesController.deleteCategory);
exports.default = router;
//# sourceMappingURL=categories.routes.js.map