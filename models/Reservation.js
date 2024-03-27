import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReservationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false }, 
  ligneId: { type: Schema.Types.ObjectId, ref: 'Ligne', required: false }, 
  nombreDesAdultes: { type: Number, required: true },
  nombreDesEnfants: { type: Number, required: true },
  nombreDeBebes: { type: Number, required: true },
  nombreDesHandicaps: { type: Number, required: true },
  fraisTotal: { type: Number, required: true },
});


export default model("Reservation", ReservationSchema);;
