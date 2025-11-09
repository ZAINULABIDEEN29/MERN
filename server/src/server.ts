import dotenv from "dotenv"
dotenv.config();
import express from "express"
import connectDB from "./db/db.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todos.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";



const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
})) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


connectDB();

app.get("/",(req,res)=>{
    res.send("Server Running Successfully")
})

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);


app.use(errorHandler);

app.listen(Number(PORT),'0.0.0.0',()=>{
    console.log(`PORT Running on http://localhost:${PORT}`)
})