import express, {Request, Response} from "express";
const app = express();
// import awsRouter from "./src/routes/AwsS3Route";
import awsRouter from "./src/routes/AwsS3Route";
import cookieParser from 'cookie-parser';
import connectToDatabase from './src/database/database'
import cors from 'cors';
import bodyParse from 'body-parser';
import authRouter from "./src/routes/Authentication";
import router2 from "./src/routes/razoroay";
import musicRouter from "./src/routes/MusicRouter";
import jwt, {JwtPayload} from 'jsonwebtoken';
import { userModel } from "./src/database/models";
const corsOptions = {
    origin: true, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
    credentials: true 
};
app.use(express.json());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/', awsRouter);
app.use('/', authRouter);
app.use('/', router2);
app.use('/', musicRouter);
connectToDatabase();

app.get('/me',async (req, res) => {
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await userModel.findOne({email: decoded.email}); 
    if(decoded.role === 'ADMIN'){
        res.status(200).json({admin: true, user: {
            username: user?.username,
            userId: user?._id,
        },})
    }else {
        res.status(200).json({admin: false})
    }
})


app.listen(3000, ()=> {
    console.log("app is listening on port 3000");
})