import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import fileRoute from "./routes/file.js";

const app = express();

//CONFIGURATION
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());

//ROUTES
app.use("/v0/auth", authRoute);
app.use("/v0/user", userRoute);
app.use("/v0/file", fileRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("server listening on port " + (process.env.PORT || 8080));
    });
  })
  .catch(() => {
    console.error("Couldn't connect");
  });
