import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
   
    subjId : { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true  },
    classId : { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true  },
    unitId : { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true  },
    quizTitle : { type: String, required: true },
    quizTitleImg : { type: String, default: "" },
    quizOptionA : { type : String, required : true },
    quizOptionAImg : { type : String, default : "" },
    quizOptionB : { type : String, required : true },
    quizOptionBImg : { type : String, default : "" },
    quizOptionC : { type : String, required : true },
    quizOptionCImg : { type : String, default : "" },
    quizOptionD : { type : String, required : true },
    quizOptionDImg : { type : String, default : "" },
    quizAnsIn : { type : Number, required : true },


}, {timestamps : true, versionKey : false})

const ExamQuiz = mongoose.model("ExamQuiz", quizSchema);

export default ExamQuiz;