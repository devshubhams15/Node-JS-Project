import dotenv from 'dotenv'
dotenv.config({path:'./env'})
import connectDB from "./db/index.js"
connectDB()









/*
const app=express()

console.log("start",process.env.MONGO_DB);

;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB}/admin}`)
        app.on("error",(error)=>{
          console.log("erorr while connecting to app",error)
          throw error
        })

        app.listen(process.env.PORT,()=>{
          console.log(`App started at ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("Error while connecting to DB",error);
        throw error
    }
    
})()
*/