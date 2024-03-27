import mongoose from "mongoose";

const { Schema, model } = mongoose;

const Ligne = new Schema({
  num: { type: Number, require: true },
  ligne: { type: String, require: true },
  heure_départ: { type: String, require: true },
  heure_retour: { type: String, require: true },
  durée: { type: String, required: true }, 
  tarif: { type: Number, required: true }, 
});

export default model("Ligne", Ligne);
