import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () =>{
  try {
    console.log("");
    const connectionInstance=await mongoose.connect(`${process.env.MONGODB}/${DB_NAME}`)
    console.log("Mongo DB connected !!!!",connectionInstance.connection.host);
  } catch (error) {
    console.log("Mongo DB connection Failed !!!!!!!",error);
    process.exit(1)
  }
}

export default connectDB