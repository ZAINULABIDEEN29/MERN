import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 1️⃣ Define the interface for the User document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// 2️⃣ Define the interface for static methods
interface IUserModel extends Model<IUser> {
  hashedPassword(password: string): Promise<string>;
}

// 3️⃣ Create the schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, "At least 3 characters required"],
      maxlength: [50, "Maximum 50 characters allowed"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      trim: false, 
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.generateAuthToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};


userSchema.statics.hashedPassword = async function (
  password: string
): Promise<string> {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
