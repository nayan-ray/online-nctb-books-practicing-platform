import { UPLOAD_DIR } from "../config/path.js";
import { findUserById } from "../helper/commonService.js";
import { successResponse } from "../helper/response.js";
import Note from "../models/note.js";
import path from "path";
import createError from "http-errors";
import { deleteImageByPath } from "../helper/deleteImagePath.js";



const createNote = async (req, res, next) => {

    const {unitId, subjId, classId, noteTitle, noteExplanation} = req.body;

    try {
      
       
       const noteTitleImgFile = req.files?.noteTitleImg?.[0];
       const noteExplanationImgFile = req.files?.noteExplanationImg?.[0];

  
       

        let noteObj = {
            unitId,
            subjId,
            classId,
            noteTitle,
            noteExplanation
           
        };
        
        if(noteTitleImgFile?.filename){
               noteObj.noteTitleImg = `${req.protocol}://${req.get("host")}/uploads/${noteTitleImgFile.filename}`;
        }

        if(noteExplanationImgFile?.filename){
               noteObj.noteExplanationImg = `${req.protocol}://${req.get("host")}/uploads/${noteExplanationImgFile.filename}`;
        }

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

const editNote = async (req, res, next) => {

     const  id = req.params.id;

     try {

          const note = await findUserById(id, Note);
        
          let updateObject = {};
            if(req.body.noteTitle){
                updateObject.noteTitle = req.body.noteTitle;
            }
            if(req.body.noteExplanation){
                updateObject.noteExplanation = req.body.noteExplanation;
            }
            if(req.body.unitId){
                updateObject.unitId = req.body.unitId;
            }
            if(req.body.subjId){
                updateObject.subjId = req.body.subjId;
            }
            if(req.body.classId){
                updateObject.classId = req.body.classId;
            }

         const noteTitleImgFile = req.files?.noteTitleImg?.[0];
         const noteExplanationImgFile = req.files?.noteExplanationImg?.[0];
            if(noteTitleImgFile){
                updateObject.noteTitleImg = `${req.protocol}://${req.get("host")}/uploads/${noteTitleImgFile?.filename}`;
                if(note?.noteTitleImg){
                    const oldFilename = note?.noteTitleImg.split("/")[4];
                    const oldPath = path.join(UPLOAD_DIR, oldFilename);
                    oldPath && deleteImageByPath(oldPath);
                }
              
            }
            if(noteExplanationImgFile){
                updateObject.noteExplanationImg = `${req.protocol}://${req.get("host")}/uploads/${noteExplanationImgFile?.filename}`;
                if(note?.noteExplanationImg){
                    const oldFilename = note?.noteExplanationImg.split("/")[4];
                    const oldPath = path.join(UPLOAD_DIR, oldFilename);
                    oldPath && deleteImageByPath(oldPath);
                }
            }
          
            const options = { new: true };

            const updatedNote = await Note.findByIdAndUpdate(id, updateObject, options);
          
            return successResponse(res,{
                statusCode  : 200,
                message  : 'note updated successfully',
                payload  : updatedNote
            })

     } catch (error) {
         next(error);
     }

}

const deleteNote = async (req, res, next) => {
    const id = req.params.id;

    try {
        const note = await findUserById(id, Note);

        if (note?.noteTitleImg) {
            const oldFilename = note?.noteTitleImg.split("/")[4];
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            oldPath && deleteImageByPath(oldPath);
        }

        if (note?.noteExplanationImg) {
            const oldFilename = note?.noteExplanationImg.split("/")[4];
            const oldPath = path.join(UPLOAD_DIR, oldFilename);
            oldPath && deleteImageByPath(oldPath);
        }

        await Note.findByIdAndDelete(id);

        return successResponse(res, {
            statusCode: 200,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export { createNote , editNote, deleteNote};
