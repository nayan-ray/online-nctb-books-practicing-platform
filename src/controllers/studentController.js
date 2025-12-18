import { createToken } from "../helper/createToken.js";
import { emailWithNodeMailer } from "../helper/email.js";
import { successResponse } from "../helper/response.js";
import createHttpError from "http-errors";
import Student from "../models/student.js";
import { secretKey } from "../../secret.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { findUserById } from "../helper/commonService.js";
import { deleteImageByPath } from "../helper/deleteImagePath.js";

const userRegister= async(req, res,next) => {
    try {
        //taken user info
       const  {name, email, password, phone, address, classId} = req.body;
       //take user image

       let image  = null;


       if(req.file){
           image = req.file.path;
       }
       //check user exist
       const userExist = await Student.exists({email : email});
       
       if(userExist){
           throw createHttpError(409,"User already exists");
        }
        

        //create newUSer object
        const newUser = {
            name, email, password, phone, address,  image, classId

        }
        
        //create token
        
        const token = createToken(newUser, secretKey, '10m');

                //prepare email

                 const emailData = {
                    email: email,
                    subject : 'Account Activation Email',
                    text: '',
                    html : `
                         <h2> Hello ${name} </h2>
                       <p>welcome to our online nctb books learning platform</p>
                     
                      <p>Please click here to
                         <a href='http://localhost:3000/api/user/activate/${token}'>
                          activate your account
                        </a>
                       </p>
                    `
               }
      
      
         //sendEmail
      
         try {
            await emailWithNodeMailer(emailData);
         } catch (error) {
             throw error;
         }

 
        return successResponse(res,{
            statusCode  : 200,
            message  : 'Student registered successfully',
            payload :{
                token
            }
        })



    } catch (error) {
        
        next(error)
    }
}

const activeUserProcess= async(req, res, next) => {
    
    try {
        //accept token and check
        const token = req.body.token;
        
         
        if(!token) {
          throw createHttpError(404, 'token not found');
        }
      // token verify and check

        try {

            const decoded = jwt.verify(token, secretKey);
            
            if(!decoded ) {
            throw createHttpError(404, 'unable to create user');
            }
             
             
             //user  exist or not check

              const userExist = await Student.exists({email  : decoded.email});
       
              if(userExist){
                  throw createHttpError(409,
                  "User with this email  already exist. Please sign in"
                 );

               }

              
        
           //finally save user in database
 
           const user = await Student.create(decoded);
             return successResponse(res,{
            statusCode  : 200,
            message  : 'student created successfully',
            payload : user
            
        })

        } catch (error) {
             if(error.name === "TokenExpiredError"){
                throw createHttpError(401, 'token expired');
             } else if(  error.name === "JsonWebTokenError"){

               throw createHttpError(401, 'invalid token');
             } else if(error instanceof mongoose.Error){
                throw createHttpError(500, 'mongoose error');
             } else{
                throw error;
             }
            
        }
   
    } catch (error) {
        
        next(error) ; 
    }
    
    
}


const getUserById = async(req, res,next) => {
    try {
        //take  id from params
       
       
        
        

        const  id = req.params.id;
     

        //options  to exclude password from response

        const options = {password : 0, admin : 0, isBanned : 0};

        //retrieve  user by id


        const user = await findUserById(id, Student, options);

         //send  response with user details


        return successResponse(res,{
            statusCode  : 200,
            message  : 'user retrieved successfully',
            payload : user
        })
       

    } catch (error) {
        
        next(error)
    }
}

const deleteUserById= async(req, res, next) => {
    try {
        //take  id from params

        const  id = req.params.id;

        //check  if user exists


        const user = await findUserById(id,  Student);
      
        //check image  exists

        // const userImagePath = user.image;
        // delete  user image from server

        // await  deleteImageByPath(userImagePath);

        // delete  user from database

        await Student.findByIdAndDelete({_id : id, isAdmin  : false});

        // send  response with success message

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user deleted successfully',
            
        })

    } catch (error) {
        
        // send  error response with error message

        next(error)
    }
}

const updateUser = async(req, res,next) => {
    try {
       //accept id
     
        const  id = req.params.id;

      //check user with this id

        const user = await findUserById(id, Student);

      //update options

       const  updateOptions = {new : true}
      
      //create update object

       let  updateObject = {};

       if(req.body.name){
          updateObject.name = req.body.name;
       }
       if(req.body.email){
          throw  createHttpError(400, 'you can not  update email');
       }

       if(req.body.password){
          updateObject.password = req.body.password;
       }
       if(req.body.phone){
          updateObject.phone = req.body.phone;
        }

        if(req.body.address){
          updateObject.address = req.body.address;
        }

        const image  = req.file;
     
       if(image){
         
          updateObject.image = `${req.protocol}://${req.get("host")}/uploads/${image?.filename}`;
        //   user.image && deleteImageByPath(user.image);
        }
      
        try {
            if(!updateObject){
                throw createHttpError(400, 'no updated object')
            }
        } catch (error) {
            throw error;
        }
     

      
       
        const  userUpdated = await Student.findByIdAndUpdate(id,  updateObject, updateOptions);
           
       //checked  if user is updated

       if(!userUpdated){

          throw createHttpError(404, 'Some thing went wrong');

       }
    

        return successResponse(res,{
            statusCode  : 200,
            message  : 'user retrieved successfully',
            payload : {
                url : `${req.protocol}://${req.get("host")}/uploads/${userUpdated.image}`
            }
        })

    } catch (error) {
        
        next(error)
    }
}

export {userRegister, activeUserProcess, getUserById, deleteUserById, updateUser}; ;