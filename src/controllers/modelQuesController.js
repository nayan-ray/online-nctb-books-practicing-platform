import { successResponse } from "../helper/response.js";
import ModelQues from "../models/modelQues.js";


const createModelQues = async (req, res, next) => {

    const {subjId, classId, unitId, quesTitle, quesA , quesB, quesC, ansA, ansB, ansC} = req.body;
 

   try {
     const quesTitleImgFile = req.files?.quesTitleImg?.[0];
     const ansAImgFile = req.files?.ansAImg?.[0];
     const ansBImgFile = req.files?.ansBImg?.[0];
     const ansCImgFile = req.files?.ansCImg?.[0];


        let modelQuesObj = {
            subjId,
            classId,
            unitId, 
            quesTitle,
            quesA,
            quesB,
            quesC,
            ansA,
            ansB,
            ansC,
          
        }
       
       if(quesTitleImgFile?.filename){
        modelQuesObj.quesTitleImg = `${req.protocol}://${req.get("host")}/uploads/modelQues/${quesTitleImgFile?.filename}`;
       }
       if(ansAImgFile?.filename){
        modelQuesObj.ansAImg = `${req.protocol}://${req.get("host")}/uploads/modelQues/${ansAImgFile?.filename}`;
       }
       if(ansBImgFile?.filename){
        modelQuesObj.ansBImg = `${req.protocol}://${req.get("host")}/uploads/modelQues/${ansBImgFile?.filename}`;
       }
       if(ansCImgFile?.filename){
        modelQuesObj.ansCImg = `${req.protocol}://${req.get("host")}/uploads/modelQues/${ansCImgFile?.filename}`;
       }

        const newModelQues = await ModelQues.create(modelQuesObj);
        return successResponse(res, {
            statusCode: 201,
            message: 'Model Question created successfully',
            payload: newModelQues
        });
   } catch (error) {
      next(error);
   }
}

export { createModelQues };