import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Ligne = new Schema({
  num: { type: Number, require: true },
  ligne: { type: String, require: true },
  heure_départ: { type: Date, require: true },
  heure_retour: { type: Date, require: true },
});

export default model("Ligne", Ligne);
