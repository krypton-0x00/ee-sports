import express, { type Request, type Response } from "express"
import dotenv from "dotenv"

dotenv.config()
type Port = string | undefined;


const app = express();
const PORT:Port = process.env.PORT;


app.get("/health",(req:Request,res:Response)=>{
    res.status(200).json({success:true})
})


app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
    
})
