"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const validate_1 = require("../../middlewares/validate");
const auth_1 = require("../../middlewares/auth");
const products_validation_1 = require("./products.validation");
const router = (0, express_1.Router)();
// Public routes
router.get('/', (0, validate_1.validate)(products_validation_1.getProductsQuerySchema), products_controller_1.ProductsController.getAllProducts);
router.get('/:id', (0, validate_1.validate)(products_validation_1.productIdSchema), products_controller_1.ProductsController.getProductById);
// Protected routes (Admin only)
router.post('/', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(products_validation_1.createProductSchema), products_controller_1.ProductsController.createProduct);
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(products_validation_1.updateProductSchema), products_controller_1.ProductsController.updateProduct);
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(products_validation_1.productIdSchema), products_controller_1.ProductsController.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map