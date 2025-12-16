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

export { createClass };