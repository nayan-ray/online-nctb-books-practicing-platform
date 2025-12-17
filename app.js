import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from "url";

import { errorResponse } from './src/helper/response.js';
import studentRouter from './src/routes/studentRoute.js';
import studentAuthRouter from './src/routes/authRoute.js';
import classRouter from './src/routes/classRoute.js';
import subjectRouter from './src/routes/subjRoute.js';
import unitRouter from './src/routes/unitRoute.js';
import noteRouter from './src/routes/noteRoute.js';
import quesRouter from './src/routes/modelQuesRoute.js';
import quizRouter from './src/routes/quizRoute.js';
import examQuizRouter from './src/routes/examQuizRoute.js';
import getImageRouter from './src/routes/imageShow.js';


const app = express();

//__dirname fix for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

//for serving static files

//   requested_file_path = static_folder_path + (URL - URL_prefix)
  

app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/auth", studentAuthRouter);
app.use("/api/v1/class", classRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/unit", unitRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/model-ques", quesRouter);
app.use("/api/v1/quiz", quizRouter);
app.use("/api/v1/exam-quiz", examQuizRouter);
app.use("/uploads", getImageRouter)
 
//client error handling
app.use((req,res,next)=>{
     next(createError(404,"router not found"))
    })



//server error handling
app.use((error,req,res,next)=>{
    if(error.code == "LIMIT_FILE_SIZE"){
        error = createError(400,'File size is too large. Maximum limit is 2MB')
    }
    if(error.code == "ENOENT" ){
        error = createError(404,'File not found')
    }
    console.log(error);
    
    return errorResponse(res,{
        statusCode :error.status,
        message : error.message,
    })
 })

export default app;