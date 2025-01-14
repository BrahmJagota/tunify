import express,{Request, Response} from 'express';
const authRouter = express.Router();
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { userModel } from '../database/models';
import {OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client();

dotenv.config()
authRouter.post('/auth-google',async (req: Request, res:Response)=> {
    const { credential, clientId } = req.body;
    try{

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId
        });
        const payload = ticket.getPayload() as {
            email: string;
            given_name: string;
            family_name: string;
          };     
        const { email, given_name, family_name } = payload;
        let user = await userModel.findOne({email});
        if(!user) {
           user = await userModel.create({
            email,
            username: `${given_name} ${family_name}`,
            authSource: "google",
           });
        }

        const accessToken = jwt.sign({userId: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET as string, {
            expiresIn: '1h'
        });

        const refreshToken = jwt.sign({
            userId: user._id, email: user.email, role: user.role
        }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });
        user.refreshToken = refreshToken;
        await user.save();
            res.status(200).cookie('accessToken', accessToken, {
                httpOnly: false,
                secure: false,
                maxAge: 3600000,
            }).cookie('refreshToken', refreshToken, {
                httpOnly: false,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }).json({message: 'Authentication successful', user});
    } catch (err) {
        console.log(err);
        res.status(400).json({err});
    }
});


authRouter.post('/refresh-token', async (req: Request, res: Response) => {
    const {refreshToken} = req.cookies;

    if(!refreshToken) res.status(400).json({error:"No refresh token provided"});
    try{
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
        const result = decoded as JwtPayload;
        const user = await userModel.findById(result.userId);
        if (!user || user.refreshToken !== refreshToken) {
            res.status(403).json({ error: 'Invalid refresh token' });
            return;
          }
      
          const newAccessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
          );
         res.status(200).cookie('accessToken', newAccessToken, {
            httpOnly: false,
            secure: false,
            maxAge: 3600000,
        }).json({message: 'Authentication successful', user});
    } catch(err) {
        console.error("err",err);
        res.status(403).json({error: "invalid or expired refresh token"});
    }
    
});

authRouter.get("/logout",async (req, res) => {
    const {refreshToken} = req.cookies;
    const user = await userModel.findOne({refreshToken});
    if(user) {
        user.deleteOne();
        res.clearCookie("accessToken", {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
        });
        res.clearCookie("refreshToken", {
            httpOnly: false,
            secure: false, 
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logout successful" });
    } else {
        res.status(200).json({message: "invalid credentials"})
    }
   

    return;
});

export default authRouter;