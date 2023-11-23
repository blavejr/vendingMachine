import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { acceptOnlyJson } from "./middleware/headers";
import router from "./routes/index";
import cors from "cors";
import errorHandlingMiddleware from "./middleware/errorHandling";

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"], 
  thods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(acceptOnlyJson);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.use(errorHandlingMiddleware);

export default app;
