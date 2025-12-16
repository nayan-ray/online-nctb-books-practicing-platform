import express from "express";
import { createNote } from "../controllers/noteController.js";
import noteImgUpload from "../middleware/noteFileUpload.js";



const router = express.Router();


router.post("/add-note", noteImgUpload.fields([{ name: "noteTitleImg", maxCount: 1 }, { name: "noteExplanationImg", maxCount: 1 }]), createNote);



export default router;