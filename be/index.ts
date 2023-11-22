import express from "express";
import bodyParser from "body-parser";
import { authMiddleware } from "./middleware/auth";
import { acceptOnlyJson } from "./middleware/headers";
import { connectMongoDB } from "./models/index";
import router from "./routes/index";

connectMongoDB();
const app = express();

app.use(bodyParser.json());
app.use(acceptOnlyJson);

// app.use(authMiddleware);

app.use(router);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
