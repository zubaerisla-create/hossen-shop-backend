"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const apiResponse_1 = require("../../utils/apiResponse");
class AuthController {
    /**
     * Handle user signup
     */
    static async signUp(req, res, next) {
        try {
            const { email, password, name } = req.body;
            const result = await auth_service_1.AuthService.signUp(email, password, name);
            apiResponse_1.ApiResponse.success(res, result.message || 'User registered successfully.', result, 201);
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * Handle user login
     */
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.login(email, password);
            apiResponse_1.ApiResponse.success(res, 'User logged in successfully.', result, 200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map