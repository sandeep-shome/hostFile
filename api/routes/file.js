import express from "express";
import {
  addFile,
  deleteFile,
  getFiles,
  sendFile,
} from "../controllers/file.js";
import verifyToken from "../middlewares/verifyToken.js";

const route = express.Router();

//ADD FILE
route.post("/add", verifyToken, addFile);

//GET FILES
route.get("/files", verifyToken, getFiles);

//DELETE FILE
route.delete("/delete/:id", verifyToken, deleteFile);

//SEND FILE
route.post("/sendmail", verifyToken, sendFile);
export default route;
