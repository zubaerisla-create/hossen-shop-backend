"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const features_controller_1 = require("./features.controller");
const validate_1 = require("../../middlewares/validate");
const auth_1 = require("../../middlewares/auth");
const features_validation_1 = require("./features.validation");
const router = (0, express_1.Router)();
// Public routes
router.get('/', features_controller_1.FeaturesController.getAllFeatures);
router.get('/:id', (0, validate_1.validate)(features_validation_1.featureIdSchema), features_controller_1.FeaturesController.getFeatureById);
// Protected routes (Admin only)
router.post('/', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(features_validation_1.createFeatureSchema), features_controller_1.FeaturesController.createFeature);
router.put('/:id', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(features_validation_1.updateFeatureSchema), features_controller_1.FeaturesController.updateFeature);
router.delete('/:id', auth_1.authenticate, auth_1.requireAdmin, (0, validate_1.validate)(features_validation_1.featureIdSchema), features_controller_1.FeaturesController.deleteFeature);
exports.default = router;
//# sourceMappingURL=features.routes.js.map