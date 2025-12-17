import express from "express";

import quizUpload from "../middleware/noteFileUpload.js";

import { createExamQuiz } from "../controllers/examQuizController.js";



const router = express.Router();


router.post("/add-quiz", quizUpload.fields([{ name: "quizTitleImg", maxCount: 1 }, { name: "quizOptionAImg", maxCount: 1 }, {name : "quizOptionBImg", maxCount : 1}, {name : "quizOptionCImg", maxCount : 1},  {name : "quizOptionDImg", maxCount : 1}]), createExamQuiz);



export default router;