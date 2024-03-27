import mongoose from "mongoose";

const { Schema, model } = mongoose;

const User = new Schema({
  nom: { type: String, require: true },
  prénom: { type: String, require: true },
  date_de_naissance: { type: Date, require: true },
  email: { type: String, require: true },
  num_telephone: { type: Number, require: true },
  code_paiement: { type: Number, require: true },
});

export default model("User", User);
