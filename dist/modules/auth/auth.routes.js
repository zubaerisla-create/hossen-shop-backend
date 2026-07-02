"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_1 = require("../../middlewares/validate");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// Public routes
router.post('/signup', (0, validate_1.validate)(auth_validation_1.signUpSchema), auth_controller_1.AuthController.signUp);
router.post('/login', (0, validate_1.validate)(auth_validation_1.loginSchema), auth_controller_1.AuthController.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map