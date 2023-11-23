import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { acceptOnlyJson } from "./middleware/headers";
import { connectMongoDB } from "./models/index";
import router from "./routes/index";
import cors from "cors";
import globalErrorHandler, {
  catchAsyncErrors,
} from "./middleware/errorHandling";

// Handle rejected promises globally
catchAsyncErrors();

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

// Custom error-handling middleware
app.use(globalErrorHandler);

export default app;
