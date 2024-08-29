import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";
const router = express.Router();
router.post('/signup',signup );

router.post('/login',login );

router.post('/logout',logout);

//remove the fuction will make it in another file 
//use controllers



export default router;