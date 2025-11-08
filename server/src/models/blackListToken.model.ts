import mongoose, {Schema,Document} from "mongoose";

export interface TokenI extends Document{
    token:string; 
}

const tokenSchema :Schema<TokenI> = new Schema ({
    token:{
        type:String,
        required:true
    }

}, {timestamps:true})

const Token = mongoose.model<TokenI>("Token", tokenSchema);

export default Token;