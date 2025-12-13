import express from 'express';
import createError from 'http-errors';

import { errorResponse } from './src/helper/response.js';
import studentRouter from './src/routes/studentRoute.js';
import studentAuthRouter from './src/routes/authRoute.js';

const app = express();

app.use(express.json());

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/auth", studentAuthRouter);
 
//client error handling
app.use((req,res,next)=>{
     next(createError(404,"router not found"))
    })



//server error handling
app.use((error,req,res,next)=>{
    
    return errorResponse(res,{
        statusCode :error.status,
        message : error.message,
    })
 })

export default app;