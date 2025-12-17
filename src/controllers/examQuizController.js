import { successResponse } from "../helper/response.js";
import ExamQuiz from "../models/examQuiz.js";




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

export { createExamQuiz };