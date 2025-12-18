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

export { createUnit, updateUnit, deleteUnit };