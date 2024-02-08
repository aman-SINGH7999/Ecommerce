import express from "express";
import {braintreeTokenController, brainterrPaymentController} from '../controllers/paymentController.js'
import { requireSingIn } from "../middlewares/authMiddlewares.js";
const router = express.Router();


// token
router.get('/braintree/token', braintreeTokenController);

// payment
router.post('/braintree/payment', requireSingIn, brainterrPaymentController);

export default router;