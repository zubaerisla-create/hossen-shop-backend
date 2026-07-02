"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partners_controller_1 = require("./partners.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Protect all delivery partner routes to admin only
router.use(auth_1.authenticate, auth_1.requireAdmin);
router.get('/', partners_controller_1.PartnersController.getAllPartners);
router.post('/', partners_controller_1.PartnersController.addPartner);
router.put('/:id/toggle', partners_controller_1.PartnersController.togglePartner);
router.delete('/:id', partners_controller_1.PartnersController.deletePartner);
exports.default = router;
//# sourceMappingURL=partners.routes.js.map