import { successResponse } from "../helper/response.js";
import createHttpError from "http-errors";
import Subject from "../models/subject.js";
import {findUserById} from "../helper/commonService.js"
import mongoose from "mongoose";



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

const getAllSubjectsByClassId = async (req, res, next) => {
    const classId = req.params.id;
    try {
        
        const classIdObj = new mongoose.Types.ObjectId(classId);
        const subjects =await Subject.aggregate([
            { $match: { classId: classIdObj } },
            { $project: { classId: 0, createdAt: 0, updatedAt: 0, __v: 0 } }
        ]);
        if(!subjects){
           throw createHttpError(404, 'No subjects found for the given class ID');
        }
        return successResponse(res, {
            statusCode: 200,
            message: 'Subjects retrieved successfully',
            payload: subjects
        });
    } catch (error) {
        next(error);
    }
}

export { createSubject, updateSubject, deleteSubject, getAllSubjectsByClassId };