import mongoose from "mongoose";
import { UPLOAD_DIR } from "../config/path.js";
import { findUserById } from "../helper/commonService.js";
import { deleteImageByPath } from "../helper/deleteImagePath.js";
import { successResponse } from "../helper/response.js";
import ExamQuiz from "../models/examQuiz.js";
import Result from "../models/studentResult.js";
import Unit from "../models/unit.js"
import path from "path";




const createExamQuiz = async (req, res, next) => {

    const {subjId, classId, unitId, quizTitle, quizOptionA , quizOptionB, quizOptionC, quizOptionD, quizAnsIn} = req.body;
 

   try {
     const quizTitleImgFile = req.files?.quizTitleImg?.[0];
     const quizOptionAImgFile = req.files?.quizOptionAImg?.[0];
     const quizOptionBImgFile = req.files?.quizOptionBImg?.[0];
     const quizOptionCImgFile = req.files?.quizOptionCImg?.[0];
     const quizOptionDImgFile = req.files?.quizOptionDImg?.[0];


        let quizObj = {
            subjId,
            classId,
            unitId, 
            quizTitle,
            quizOptionA,
            quizOptionB,
            quizOptionC,
            quizOptionD,
            quizAnsIn
           
          
        }

       if(quizTitleImgFile?.filename){
        quizObj.quizTitleImg = `${req.protocol}://${req.get("host")}/uploads/${quizTitleImgFile?.filename}`;
       }
       if(quizOptionAImgFile?.filename){
        quizObj.quizOptionAImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionAImgFile?.filename}`;
       }
       if(quizOptionBImgFile?.filename){
        quizObj.quizOptionBImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionBImgFile?.filename}`;
       }
       if(quizOptionCImgFile?.filename){
        quizObj.quizOptionCImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionCImgFile?.filename}`;
       }
       if(quizOptionDImgFile?.filename){
        quizObj.quizOptionDImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionDImgFile?.filename}`;
       }
       

       const newQuiz = await ExamQuiz.create(quizObj);
        return successResponse(res, {
            statusCode: 201,
            message: 'Quiz created successfully',
            payload: newQuiz
        });
   } catch (error) {
      next(error);
   }
}

const updateExamQuiz = async (req, res, next) => {

    const id = req.params.id;
    try {
        const quiz = await findUserById(id, ExamQuiz);
        let updateObject = {};

        if(req.body.quizTitle){
            updateObject.quizTitle = req.body.quizTitle;
        }
        if(req.body.quizOptionA){
            updateObject.quizOptionA = req.body.quizOptionA;
        }
        if(req.body.quizOptionB){
            updateObject.quizOptionB = req.body.quizOptionB;
        }
        if(req.body.quizOptionC){
            updateObject.quizOptionC = req.body.quizOptionC;
        }
        if(req.body.quizOptionD){
            updateObject.quizOptionD = req.body.quizOptionD;
        }
        if(req.body.quizAnsIn){
            updateObject.quizAnsIn = req.body.quizAnsIn;
        }

        const quizTitleImgFile = req.files?.quizTitleImg?.[0];
        const quizOptionAImgFile = req.files?.quizOptionAImg?.[0];
        const quizOptionBImgFile = req.files?.quizOptionBImg?.[0];
        const quizOptionCImgFile = req.files?.quizOptionCImg?.[0];
        const quizOptionDImgFile = req.files?.quizOptionDImg?.[0];

        if(quizTitleImgFile){
            updateObject.quizTitleImg = `${req.protocol}://${req.get("host")}/uploads/${quizTitleImgFile?.filename}`;
            if(quiz.quizTitleImg){
                const oldFilename = quiz.quizTitleImg.split("/")[4];
                const oldPath = path.join(UPLOAD_DIR, oldFilename);
                oldPath && deleteImageByPath(oldPath);
            }
        }
        if(quizOptionAImgFile){
            updateObject.quizOptionAImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionAImgFile?.filename}`;
            if(quiz.quizOptionAImg){
                const oldFilename = quiz.quizOptionAImg.split("/")[4];
                const oldPath = path.join(UPLOAD_DIR, oldFilename);
                oldPath && deleteImageByPath(oldPath);
            }
        }
        if(quizOptionBImgFile){
            updateObject.quizOptionBImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionBImgFile?.filename}`;
            if(quiz.quizOptionBImg){
                const oldFilename = quiz.quizOptionBImg.split("/")[4];
                const oldPath = path.join(UPLOAD_DIR, oldFilename);
                oldPath && deleteImageByPath(oldPath);
            }
        }
        if(quizOptionCImgFile){
            updateObject.quizOptionCImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionCImgFile?.filename}`;
            if(quiz.quizOptionCImg){
                const oldFilename = quiz.quizOptionCImg.split("/")[4];
                const oldPath = path.join(UPLOAD_DIR, oldFilename);
                oldPath && deleteImageByPath(oldPath);
            }
        }
        if(quizOptionDImgFile){
            updateObject.quizOptionDImg = `${req.protocol}://${req.get("host")}/uploads/${quizOptionDImgFile?.filename}`;
            if(quiz.quizOptionDImg){
                const oldFilename = quiz.quizOptionDImg.split("/")[4];
                const oldPath = path.join(UPLOAD_DIR, oldFilename);
                oldPath && deleteImageByPath(oldPath);
            }
        }

        const options = { new: true };

        const updatedQuiz = await ExamQuiz.findByIdAndUpdate(id, updateObject, options);

        return successResponse(res,{
            statusCode  : 200,
            message  : 'Quiz updated successfully',
            payload  : updatedQuiz
        })
    } catch (error) {
         next(error);
    }
}

const deleteExamQuiz = async (req, res, next) => {
    const id = req.params.id;
    try {
        const quiz =  await findUserById(id, ExamQuiz);

        if(quiz.quizTitleImg){
            const oldFilename = quiz.quizTitleImg.split("/")[4];
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            oldPath && deleteImageByPath(oldPath);
        }
        if(quiz.quizOptionAImg){
            const oldFilename = quiz.quizOptionAImg.split("/")[4];
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            oldPath && deleteImageByPath(oldPath);
        }
        if(quiz.quizOptionBImg){
            const oldFilename = quiz.quizOptionBImg.split("/")[4];
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            oldPath && deleteImageByPath(oldPath);
        }
        if(quiz.quizOptionCImg){
            const oldFilename = quiz.quizOptionCImg.split("/")[4];
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            oldPath && deleteImageByPath(oldPath);
        }
        if(quiz.quizOptionDImg){
            const oldFilename = quiz.quizOptionDImg.split("/")[4];
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            oldPath && deleteImageByPath(oldPath);
        }
        await ExamQuiz.findByIdAndDelete(id);

        return successResponse(res,{
            statusCode  : 200,
            message  : 'Quiz deleted successfully'
        })
    } catch (error) {
        next(error);
    }
}

const getQuizByUnitId = async (req, res, next)=>{
    const id = req.params.id;

    try {
        const quizzes = await ExamQuiz.find({unitId : id});

         return successResponse(res,{
            statusCode  : 200,
            message  : 'Quiz deleted successfully',
            payload : quizzes
        })
        
    } catch (error) {
        next(error)
    }

}

const submitQuizByUnit = async (req, res, next)=>{
     const studentId = req.student.id;
     const answerList = req.body.anserList;
     const unitId = req.body.unitId;
    
     let resultObj = {studentId, unitId};
     const total = req.body.anserList.length;
     let correct = 0;
  
    try {
        const [unit] = await Unit.aggregate([
            {$match : {_id : new mongoose.Types.ObjectId(unitId)}},
            {$lookup : {
                from : "subjects",
                localField : "subjId" ,
                foreignField : "_id",
                as : "subject"
            }},
            {$unwind : "$subject"},
              {$lookup : {
                from : "classes",
                localField : "classId" ,
                foreignField : "_id",
                as : "class"
            }},
            {$unwind : "$class"},

        ])

        if(unit.subject){
            resultObj.subjName = unit.subject.subjName;
        }
        if(unit.class){
            resultObj.className = unit.class.className;
        }

       

        for(const item of answerList){
            const quiz = await ExamQuiz.findOne({_id : item.quizId});
            if( quiz && quiz.quizAnsIn === item.quizAnsIn){
                correct = correct + 1;
            }
        }

        if(correct){
            resultObj.correct = correct;
            resultObj.total = total;
        }
      

        const result=   await Result.findOneAndUpdate(
            {unitId, studentId},
            {$set :{correct, updatedAt: new Date()}, 
             $setOnInsert : {
               unitId,
               studentId,
               subjName : resultObj.subjName,
               className : resultObj.className,
               total,
               createdAt: new Date()
            }},
            
            {
               upsert: true,
               new: true
            }
        );

         return successResponse(res,{
            statusCode  : 200,
            message  : 'result submit successfully',
            payload : result
        })
       
    } catch (error) {
        next(error)
    }
    

}

const getResultByUnitAndUser = async (req, res, next)=>{
    const unitId = req.params.id;
  
    const studentId = req.student.id;
   
    try {
        const result = await Result.findOne({unitId, studentId}, {correct : 1, total : 1});
         return successResponse(res,{
            statusCode  : 200,
            message  : 'result submit successfully',
            payload : result
        })
    } catch (error) {
        next(error)
    }
}

const resultBySubj = async (req, res, next)=>{
    try {
        const result = await Result.aggregate([
            {$group :{
                _id : {subjName : "$subjName", studentId : "$studentId"},
                totalCorrect : {$sum : "$correct"},
                totalNumber : {$sum : "$total"}
            }}
        ])

         return successResponse(res,{
            statusCode  : 200,
            message  : 'result submit successfully',
            payload : result
        })
        
    } catch (error) {
        next(error)
    }

}
export { createExamQuiz, deleteExamQuiz, updateExamQuiz , getQuizByUnitId, submitQuizByUnit, getResultByUnitAndUser, resultBySubj};