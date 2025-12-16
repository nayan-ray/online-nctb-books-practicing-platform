import express from "express";
import { createUnit } from "../controllers/unitController.js";


const router = express.Router();


router.post("/add-unit", createUnit);



export default router;