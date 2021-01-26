import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  _id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  username: string;
  password: string;
  created?: any;
}

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export default mongoose.model<UserInterface>("User", userSchema);
