import express, {Request, Response} from 'express';
import crypto from 'crypto';
import { createOrder } from '../services/razorpayService';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { purchasedModel } from '../database/models';
const router2 = express();

router2.post('/payment-capture',async (req: Request, res: Response) => {
    const { response, musicId } = req.body;
    const token = req.cookies.accessToken;
    const body_data = response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const data = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET || "")
    .update(body_data)
    .digest("hex");


    const isValid = data === response.razorpay_signature;

    if(isValid) {

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const result = await purchasedModel.create({musicId, userId: decoded.userId, payment: "successful"});
        if(result) {
            res.json({result});
            return;
        }
    } else {
        res.json({isValid: false});
    }
})

router2.post('/create-order', async (req: Request, res: Response) => {
    const { amount } = req.body;
    try{
        const response = await createOrder(amount);
        res.status(200).json(response)
    } catch (err) {
        console.error("error while creating order",err);
    }
})
export default router2;