import express from "express";
import { createSubject } from "../controllers/subjectController.js";



const router = express.Router();


router.post("/add-subject", createSubject);



export default router;