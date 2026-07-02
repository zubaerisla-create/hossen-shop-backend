"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_routes_1 = __importDefault(require("../modules/categories/categories.routes"));
const products_routes_1 = __importDefault(require("../modules/products/products.routes"));
const features_routes_1 = __importDefault(require("../modules/features/features.routes"));
const orders_routes_1 = __importDefault(require("../modules/orders/orders.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const cms_routes_1 = __importDefault(require("../modules/cms/cms.routes"));
const newsletter_routes_1 = __importDefault(require("../modules/newsletter/newsletter.routes"));
const partners_routes_1 = __importDefault(require("../modules/partners/partners.routes"));
const upload_routes_1 = __importDefault(require("../modules/upload/upload.routes"));
const payments_routes_1 = __importDefault(require("../modules/payments/payments.routes"));
const router = (0, express_1.Router)();
// Mount modules under API namespaces
router.use('/auth', auth_routes_1.default);
router.use('/categories', categories_routes_1.default);
router.use('/products', products_routes_1.default);
router.use('/features', features_routes_1.default);
router.use('/orders', orders_routes_1.default);
router.use('/cms', cms_routes_1.default);
router.use('/newsletter', newsletter_routes_1.default);
router.use('/partners', partners_routes_1.default);
router.use('/upload', upload_routes_1.default);
router.use('/payments', payments_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map