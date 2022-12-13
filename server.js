import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js'
import songRoutes from './routes/songRoutes.js'
import likeRoutes from './routes/likeRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import dotenv from "dotenv" ;
import cors from "cors";
import bandRoutes from './routes/bandRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js';


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

// app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocument));
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
app.use("/img/user",express.static('uploads/images/user'));
app.use('/img/band', express.static('uploads/images/band'))
app.use("/music",express.static('uploads/music'));
app.use("/user", userRoutes);
app.use("/playlist", playlistRoutes);
app.use("/song", songRoutes);
app.use("/like", likeRoutes);
app.use("/chat", chatRoutes);
app.use("/band", bandRoutes );
app.use("/event", eventRoutes );
app.use("/invitation", invitationRoutes );



app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



