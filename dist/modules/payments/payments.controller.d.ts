import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middlewares/auth';
export declare class PaymentsController {
    /**
     * Create a PaymentIntent for checkout
     */
    static createPaymentIntent(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
export default PaymentsController;
