import express from "express";
import { getData } from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";
const route = express.Router();

route.get("/get-data", verifyToken, getData);

export default route;
