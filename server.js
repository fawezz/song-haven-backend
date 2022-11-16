import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import dotenv from "dotenv" ;
import cors from "cors";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HavenSon API",
      version: "1.0.0",
      description: "Haven Song API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://127.0.0.1:9090",
        description: "My API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};
const app = express();
const port = process.env.PORT || 9090;
const portDatabase = 27017;
const hostname = process.env.HOSTNAME || '127.0.0.1';
const databaseName = 'songhaven';


const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

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


app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



