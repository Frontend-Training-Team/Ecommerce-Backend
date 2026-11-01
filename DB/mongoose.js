import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export async function mongooseConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DataBace Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}
