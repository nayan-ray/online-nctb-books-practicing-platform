import { successResponse } from "../helper/response.js";
import Subject from "../models/subject.js";



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

export { createSubject };