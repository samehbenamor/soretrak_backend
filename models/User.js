import mongoose from "mongoose";

const { Schema, model } = mongoose;

const User = new Schema({
  nom: { type: String, require: true },
  prenom: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, required: true },
  num_telephone: { type: Number, require: true },
  code_paiement: { type: Number, require: false },
  credit: { type: Number, default: 10 },
  role: { type: String, default: "user" },
});

export default model("User", User);
