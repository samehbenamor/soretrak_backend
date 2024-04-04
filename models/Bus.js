import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BusSchema = new Schema({
  ligneId: { type: Schema.Types.ObjectId, ref: 'Ligne', required: true },
  departureTime: { type: String, required: true },
  date: { type: Date, required: true },
  nombrePlaces: { type: Number, default: 55 }, // Default value set to 55
});

export default model("Bus", BusSchema);
