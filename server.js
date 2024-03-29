import express, { urlencoded } from 'express';
import mongoose from 'mongoose';


const app = express();
const port = process.env.PORT || 9090;
const portDatabase = 27017;
const hostname = '127.0.0.1';
const databaseName = 'musician-app';


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
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});