import { successResponse } from "../helper/response.js";
import Note from "../models/note.js";
import createError from "http-errors";



const createNote = async (req, res, next) => {

    const {unitId, subjId, classId, noteTitle, noteExplanation} = req.body;

    try {
       console.log(req.files);
       
       const noteTitleImgFile = req.files?.noteTitleImg?.[0];
       const noteExplanationImgFile = req.files?.noteExplanationImg?.[0];

  
       const noteTitleImg = `${req.protocol}://${req.get("host")}/uploads/note/${noteTitleImgFile.filename}`;
       const noteExplanationImg = `${req.protocol}://${req.get("host")}/uploads/note/${noteExplanationImgFile.filename}`;


        const noteObj = {
            unitId,
            subjId,
            classId,
            noteTitle,
            noteExplanation,
            noteTitleImg,
            noteExplanationImg
        };

        const newNote = await Note.create(noteObj);
        return successResponse(res, {
            statusCode: 201,
            message: 'Note created successfully',
            payload: newNote
        });

    } catch (error) {
        
         next(error);
   }
    

}

export { createNote };


