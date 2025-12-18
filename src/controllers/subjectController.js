import { successResponse } from "../helper/response.js";
import Subject from "../models/subject.js";
import {findUserById} from "../helper/commonService.js"



const createSubject = async (req, res, next) => {
    const { subjName, classId } = req.body;

    try {
        const subjectObj = { subjName, classId };

        const newSubject = await Subject.create(subjectObj);

        return successResponse(res, {
            statusCode: 201,
            message: 'Subject created successfully',
            payload: newSubject
        });
        
    } catch (error) {
        next(error);
    }
}

const updateSubject = async (req, res, next) => {
    const id = req.params.id;
    let subjObj = {};
    if(req.body.subjName){
        subjObj.subjName = req.body.subjName;
    }
    if(req.body.classId){
        subjObj.classId = req.body.classId;
    }
    try {
        await findUserById(id, Subject);
        const updatedSubject = await Subject.findByIdAndUpdate(id, subjObj, { new: true });
        return successResponse(res, {
            statusCode: 200,
            message: 'Subject updated successfully',
            payload: updatedSubject
        });
    } catch (error) {
        next(error);
    }
}

const deleteSubject = async (req, res, next) => {
    const id = req.params.id;
    try {
        await findUserById(id, Subject);
        await Subject.findByIdAndDelete(id);
        return successResponse(res, {
            statusCode: 200,
            message: 'Subject deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export { createSubject, updateSubject, deleteSubject };