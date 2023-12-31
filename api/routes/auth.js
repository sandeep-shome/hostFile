import express from "express";
import {
  findName,
  signIn,
  signOut,
  signUp,
  signUpWithGoogle,
} from "../controllers/auth.js";

const router = express.Router();

//FIND NAME
router.get("/name/:n", findName);

//SIGN UP
router.post("/signup", signUp);

//SIGN UP WITH GOOGLE
router.post("/signup-google", signUpWithGoogle);

//SIGN IN
router.post("/signin", signIn);

//SIGN OUT
router.get("/signout", signOut);

export default router;
