import express from "express";

import quizUpload from "../middleware/noteFileUpload.js";

import { createExamQuiz, deleteExamQuiz, getQuizByUnitId, getResultByUnitAndUser, resultBySubj, submitQuizByUnit, updateExamQuiz } from "../controllers/examQuizController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";



const router = express.Router();


router.post("/add-quiz", isLoggedIn, quizUpload.fields([{ name: "quizTitleImg", maxCount: 1 }, { name: "quizOptionAImg", maxCount: 1 }, {name : "quizOptionBImg", maxCount : 1}, {name : "quizOptionCImg", maxCount : 1},  {name : "quizOptionDImg", maxCount : 1}]), createExamQuiz);
router.put("/edit-quiz/:id", isLoggedIn, quizUpload.fields([{ name: "quizTitleImg", maxCount: 1 }, { name: "quizOptionAImg", maxCount: 1 }, {name : "quizOptionBImg", maxCount : 1}, {name : "quizOptionCImg", maxCount : 1},  {name : "quizOptionDImg", maxCount : 1}]), updateExamQuiz);
router.delete("/delete-quiz/:id",isLoggedIn, deleteExamQuiz);
router.get("/get-quiz-unit/:id",isLoggedIn, getQuizByUnitId);
router.post("/submit", isLoggedIn, submitQuizByUnit);
router.get("/result-by-unit/:id",isLoggedIn, getResultByUnitAndUser);
router.get("/result",isLoggedIn, resultBySubj)

export default router;