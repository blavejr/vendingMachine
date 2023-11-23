import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { acceptOnlyJson } from "./middleware/headers";
import { connectMongoDB } from "./models/index";
import router from "./routes/index";
import cors from "cors";
import errorHandlingMiddleware from "./middleware/errorHandling";

// TODO: db connection should happen in server.ts
connectMongoDB();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000"], // Replace with the origin of your React app
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(acceptOnlyJson);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies

app.use(router);

app.use(errorHandlingMiddleware);

export default app;
