import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from "dotenv" ;
import cors from "cors";

const app = express();
const port = process.env.PORT || 9090;
const portDatabase = 27017;
const hostname = process.env.HOSTNAME || '127.0.0.1';
const databaseName = 'songhaven';


dotenv.config();

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://${hostname}:${portDatabase}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({extended: true}));
app.use("/img",express.static('uploads/images'));
app.use("/user", userRoutes);


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});