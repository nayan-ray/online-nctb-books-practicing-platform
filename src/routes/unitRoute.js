import express from "express";
import { createUnit, deleteUnit, updateUnit } from "../controllers/unitController.js";


const router = express.Router();


router.post("/add-unit", createUnit);
router.put("/update-unit/:id", updateUnit);
router.delete("/delete-unit/:id", deleteUnit);


export default router;