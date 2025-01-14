import express, {Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { deleteObject, getObject, listObjects, putObject } from '../AwsS3Services';
import { musicModel } from '../database/models';
const awsRouter = express.Router();
awsRouter.post("/get-object" , async (req: Request, res: Response)=> {
    const {key} = req.body;
    try {
        const url = await getObject(key);
        res.send(url);

    } catch(err) {
        console.error(err)
res.status(400).json({error: "error while getting music"})
    }
});

awsRouter.post("/put-object", async (req, res)=> {
    const {contentType, filename, amount} = req.body;
    const token = req.cookies.accessToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if(decoded.role === "ADMIN") {
        const key = `${filename}-${Date.now()}`;
        const music = await musicModel.create({title: filename, key: key, amount});
        const url = await putObject(key, contentType);
        if(music && url) {
            res.json(url);
        } else {
            res.json({result: false})
        }
    } else {
        res.json(400).json({success: false});
    }
});
awsRouter.post('/upload-music', async (req, res)=> {
    const {fileInfo} = req.body;
    const {accessToken} = req.cookies;
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;
        if(decoded.role !== "ADMIN") {
            const musicKey = `/musics/${fileInfo.filename}-${Date.now()}`;
            const thumbnailKey = `/thumbnails/${fileInfo.filename}-${Date.now()}`;
            const music = await musicModel.create({title: fileInfo.filename, musicKey, thumbnailKey, amount: fileInfo.amount, userId: decoded.userId});
            const musicUrl = await putObject(musicKey, "audio/mpeg");
            const thumbnailUrl = await putObject(thumbnailKey, "image/jpeg"); // also accept image/png

            if(music && musicUrl && thumbnailUrl) {
                res.status(200).json({musicUrl, thumbnailUrl});
            } else {
                res.status(400).json({error: "error whike uploading"})
            }
        } else {
                res.status(400).json({error: "error whike uploading"})
            }
    } catch (err){
        console.log('err while uploading music', err)
        res.status(400).json({error: "error while uploading"})
    }
})
awsRouter.get("/list-objects", async (req, res)=> {
    const result = await listObjects();
    res.send(result);
});

awsRouter.get("/delete-object", async (req, res)=> {
    const {key} = req.body;
    const result = await deleteObject(key);
    res.send(result);
})

awsRouter.get("/list-music", async (req, res)=> {
    try{
    const result = await musicModel.find({});
    res.json(result);
    } catch(err) {
        console.error("Cannot get music:", err);
    }
})

awsRouter.get('/test-1', (req, res)=> {
    res.send("working test-1")
})
export default awsRouter;