import mongoose from "mongoose";
import { findUserById } from "../helper/commonService.js";
import { successResponse } from "../helper/response.js";
import Unit from "../models/unit.js";


const createUnit = async (req, res, next) => {

    const {unitName, subjId, classId} = req.body;

    try {
        const unitObj = {unitName, subjId, classId};

        const newUnit = await Unit.create(unitObj);
        return successResponse(res, {
            statusCode: 201,
            message: 'Unit created successfully',
            payload: newUnit
        });

    } catch (error) {
        next(error);
    }

}

const updateUnit = async (req, res, next) => {
    const id = req.params.id;

    let subjectObj = {};
    if(req.body.unitName){
        subjectObj.unitName = req.body.unitName;
    }
    if(req.body.subjId){
        subjectObj.subjId = req.body.subjId;
    }
    if(req.body.classId){
        subjectObj.classId = req.body.classId;
    }

    try {
        await findUserById(id, Unit);
        const updatedUnit = await Unit.findByIdAndUpdate(id, subjectObj, { new: true });
        return successResponse(res, {
            statusCode: 200,
            message: 'Unit updated successfully',
            payload: updatedUnit
        });
    } catch (error) {
        next(error);
    }
}

const deleteUnit = async (req, res, next) => {
    const id = req.params.id;
    try {
        await findUserById(id, Unit);
        await Unit.findByIdAndDelete(id);
        return successResponse(res, {
            statusCode: 200,
            message: 'Unit deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

const getAllUnitsBySubjectId = async (req, res, next) => {
    const id = req.params.id;
    const subjId = new mongoose.Types.ObjectId(id);
    try {
        const units = await Unit.aggregate([
            { $match: { subjId: subjId } },
            { $project: {
               subjId: 0, createdAt: 0, updatedAt: 0, __v: 0, classId: 0
               
            }}
        ]);
        return successResponse(res, {
            statusCode: 200,
            message: 'Units fetched successfully',
            payload: units
        });
        
    } catch (error) {
        next(error);
    }
}

const getUnitDetails = async (req, res, next) => {
    const id = req.params.id;
    const unitID = new mongoose.Types.ObjectId(id);
    try {
        const details = await Unit.aggregate([
            { $match: { _id: unitID } },
            {$facet : {
                notes :[
                    { $lookup : {
                        from : "notes",
                        pipeline: [
                            { $match: { unitId: unitID } },
                            { $project: {subjId : 0, classId: 0, createdAt: 0, updatedAt: 0, __v: 0 } }
                        ],
                        as : "notes"
                    }},
                      { $unwind: "$notes" },
                      { $replaceRoot: { newRoot: "$notes" } },
                        {$count : "totalNotes" }
                ],
                questions : [
                    { $lookup : {
                        from : "modelques",
                        pipeline: [
                            { $match: { unitId: unitID } },
                            { $project: {subjId : 0, classId: 0, createdAt: 0, updatedAt: 0, __v: 0 } }
                        ],
                        as : "questions"
                    }},
                      { $unwind: "$questions" },
                      { $replaceRoot: { newRoot: "$questions" } },
                      {$count : "totalQuestions" }
                ],

                quizzes : [
                    { $lookup : {
                        from : "quizzes",
                        pipeline: [
                            { $match: { unitId: unitID } },
                            { $project: {subjId : 0, classId: 0, createdAt: 0, updatedAt: 0, __v: 0 } }
                        ],
                        as : "quizzes"
                    }},
                      { $unwind: "$quizzes" },
                      { $replaceRoot: { newRoot: "$quizzes" } },
                      {$count : "totalQuizzes" }
                ]
            }}
        ])
        return successResponse(res, {
            statusCode: 200,
            message: 'Unit details fetched successfully',
            payload: details
        });
    } catch (error) {
        next(error);
    }
}

export { createUnit, updateUnit, deleteUnit, getAllUnitsBySubjectId, getUnitDetails };