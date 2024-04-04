import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors";
import User  from './routes/User.js';
import Ligne from './routes/Ligne.js';
import Bus from './routes/Bus.js';
import Reservation from './routes/Reservation.js';
dotenv.config();


process.env.TZ = 'Africa/Tunis';

const app = express();

const port = process.env.PORT;
const databaseName = process.env.DATABASE_NAME;
const host = process.env.HOST

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());
/*app.use(express.urlencoded({ extended: false }));*/
app.use(cors());

app.use('/user', User);
app.use('/ligne', Ligne);
app.use('/reservation', Reservation);
app.use('/bus', Bus);


app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
