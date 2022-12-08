import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js'
import songRoutes from './routes/songRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import dotenv from "dotenv" ;
import cors from "cors";
import bandRoutes from './routes/bandRoutes.js';



// import swaggerUI from 'swagger-ui-express';
// import swaggerJsDoc from 'swagger-jsdoc';


// import { createRequire } from "module";
// import e from 'cors';
// const require = createRequire(import.meta.url);
// const swaggerDocument = require('./swagger.json')


const app = express();
const port = process.env.PORT || 9090;
const portDatabase = 27017;
const hostname = process.env.HOSTNAME || '127.0.0.1';
const databaseName = 'songhaven';

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument));
dotenv.config(); 

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
app.use("/music",express.static('uploads/music'));
app.use("/user", userRoutes);
app.use("/playlist", playlistRoutes);
app.use("/song", songRoutes);
app.use("/like", likeRoutes);

app.use("/band", bandRoutes );
app.use('/img', express.static('uploads'))
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



