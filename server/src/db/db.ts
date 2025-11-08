import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject = {};

const connectDB = async ():Promise<void>=>{
    try {
       const db = await mongoose.connect(process.env.MONGO_URI as string || "",{})
       connection.isConnected = mongoose.connection.readyState;
       console.log("Db Connected",db.connection.host);
        
    } catch (error:any) {
        console.log("Error connecting to database:",error.message);
        process.exit(1);

    }
}


export default connectDB;