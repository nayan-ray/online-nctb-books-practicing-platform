import express from "express";
import { createSubject, deleteSubject, getAllSubjectsByClassId, updateSubject } from "../controllers/subjectController.js";



const router = express.Router();


router.post("/add-subject", createSubject);
router.put("/update-subject/:id", updateSubject);
router.delete("/delete-subject/:id", deleteSubject);
router.get("/:id",getAllSubjectsByClassId)


export default router;