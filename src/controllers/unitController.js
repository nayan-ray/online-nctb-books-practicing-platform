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

export { createUnit };