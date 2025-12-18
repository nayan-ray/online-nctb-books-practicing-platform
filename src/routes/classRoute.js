import express from "express";
import { createClass, deleteClass, updateClass } from "../controllers/classController.js";


const router = express.Router();


router.post("/add-class", createClass);
router.put("/edit-class/:id", updateClass);
router.delete("/delete-class/:id", deleteClass);



export default router;