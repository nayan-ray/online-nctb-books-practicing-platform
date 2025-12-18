import { findUserById } from "../helper/commonService.js";
import { successResponse } from "../helper/response.js";
import Class from "../models/class.js";


const createClass = async (req, res, next)=>{

    const { className } = req.body;

    try {
        const classObj={ className };

       const newClass =  await Class.create(classObj);

        return successResponse(res,{
            statusCode  : 201,
            message  : 'Class created successfully' ,
            payload :  newClass   
        })
        
    } catch (error) {
        next(error);
    }

}

const updateClass = async (req, res, next) => {
    const id = req.params.id;
    const { className } = req.body;
    try {
        await findUserById(id, Class);
        
        const updatedClass = await Class.findByIdAndUpdate(id, { className }, { new: true });
        return successResponse(res, {
            statusCode: 200,
            message: 'Class updated successfully',
            payload: updatedClass
        });
    } catch (error) {
        next(error);
    }
}

const deleteClass = async (req, res, next) => {
    const id = req.params.id;
    try {
        await findUserById(id, Class);
        await Class.findByIdAndDelete(id);
        return successResponse(res, {
            statusCode: 200,
            message: 'Class deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}

export { createClass, updateClass, deleteClass };