import express from "express";
import { createUnit, deleteUnit, getAllUnitsBySubjectId, getUnitDetails, updateUnit } from "../controllers/unitController.js";


const router = express.Router();


router.post("/add-unit", createUnit);
router.put("/update-unit/:id", updateUnit);
router.delete("/delete-unit/:id", deleteUnit);
router.get("/subject/:id", getAllUnitsBySubjectId);
router.get("/details/:id", getUnitDetails)

export default router;