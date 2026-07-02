"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cms_controller_1 = require("./cms.controller");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
// Publicly read CMS pages
router.get('/:key', cms_controller_1.CmsController.getSetting);
// Admin-only updates
router.put('/:key', auth_1.authenticate, auth_1.requireAdmin, cms_controller_1.CmsController.updateSetting);
exports.default = router;
//# sourceMappingURL=cms.routes.js.map