import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getPurchasedMusic } from '../services/musicService';
const musicRouter = express.Router();

musicRouter.get('/get-purchased-music',async (req, res) => {
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    try {
        if(decoded.role === 'ADMIN'){
            const result = await getPurchasedMusic(decoded.role);
            res.status(200).json(result);
            return;
        }
        const result = await getPurchasedMusic(decoded.userId);
        res.status(200).json(result)
        return;
    } catch (err) { 
        console.log("err getting purchased music", err)
        res.status(400);
        return;
    }
})

export default musicRouter;