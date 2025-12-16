import express from "express";
import { createClass } from "../controllers/classController.js";


const router = express.Router();


router.post("/add-class", createClass);



export default router;