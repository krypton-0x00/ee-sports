
import express, { type Request, type Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
type Port = string | undefined;


const app = express();
const PORT:Port = process.env.PORT;

app.use(cors())
app.use(express.json())

//app.use("/api/v1/auth",)

app.get("/health",(req:Request,res:Response)=>{
    res.status(200).json({success:true})
})


app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
    
})
