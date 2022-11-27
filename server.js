import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
//import bandRoutes from './routes/bandRoutes.js';

import dotenv from "dotenv" ;
import cors from "cors";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json')


const app = express();
const port = process.env.PORT || 9090;
const portDatabase = 27017;
const hostname = process.env.HOSTNAME || '127.0.0.1';
const databaseName = 'songhaven';

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument));
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
app.use("/user", userRoutes);
//app.use("/band", bandRoutes);


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



