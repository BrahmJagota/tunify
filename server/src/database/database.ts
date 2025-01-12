import  mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config()

const connectToDatabase =async ():Promise<void>=> {
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to mongodb")

    } catch(error){
        console.error('Error while connecting with database:', error);
        process.exit(1); 
    }
}

export default connectToDatabase;