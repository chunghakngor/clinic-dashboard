import mongoose, { Schema, Document } from "mongoose";

interface Contact {
  method: string;
  user_id: string;
  comments: string;
}

export interface PatientInterface extends Document {
  firstname: string;
  lastname: string;
  commission_rate?: number;
  price_quote: number;
  first_contact?: any;
  comments?: string[];
  consult_date?: Date;
  deposit: number;
  ht?: Date;
  graft?: number;
  follow_up_2w?: Date;
  follow_up_3m?: Date;
  follow_up_6m?: Date;
  follow_up_1y?: Date;
  contact_method?: Contact[];
  created?: Date;
}

const patientSchema = new Schema({
  firstname: String,
  lastname: String,
  commission_rate: Number,
  price_quote: Number,
  first_contact: Date,
  comments: [{ body: String, date: Date }],
  consult_date: Date,
  deposit: Number,
  ht: Date,
  graft: Number,
  follow_up_2w: Date,
  follow_up_3m: Date,
  follow_up_6m: Date,
  follow_up_1y: Date,
  contact_method: [{ method: String, user_id: String, comments: String }],
  created: { type: Date, default: Date.now },
});

export default mongoose.model<PatientInterface>("Patient", patientSchema);
