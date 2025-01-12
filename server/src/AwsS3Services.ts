import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, ListObjectsCommand} from "@aws-sdk/client-s3";
import * as dotenv from 'dotenv'
dotenv.config()
const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
        secretAccessKey: process.env.AWS_SECRET_KEY ?? ""
    }
});

export async function getObject(key: string){
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export async function putObject(key: string, contentType: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export async function putMusic(key: string, contentType: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export async function putThumbnail(key: string, contentType: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

export async function deleteObject(key: string){
    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    });
    await s3Client.send(command);
}

export async function listObjects(){
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
    });
    const result = await s3Client.send(command);
    return result;
}