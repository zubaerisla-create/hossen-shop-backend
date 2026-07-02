import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../utils/apiResponse';

export class AuthController {
  /**
   * Handle user signup
   */
  static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, name } = req.body;
      const result = await AuthService.signUp(email, password, name);
      
      ApiResponse.success(
        res,
        result.message || 'User registered successfully.',
        result,
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle user login
   */
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      
      ApiResponse.success(
        res,
        'User logged in successfully.',
        result,
        200
      );
    } catch (error) {
      next(error);
    }
  }
}
export default AuthController;
