import mongoose from "mongoose";

const modelQuesSchema = new mongoose.Schema({
   
    subjId : { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true  },
    classId : { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true  },
    unitId : { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true  },
    quesTitle : { type: String, required: true },
    quesTitleImg : { type: String, default: "" },
    quesA : { type: String, required: true },
    ansAImg : { type: String, default: "" },
    quesB : { type: String, required: true },
    ansBImg : { type: String, default: "" },
    quesC : { type: String, required: true },
    ansCImg : { type: String, default: "" },
    ansA : {type : String, required: true},
    ansB : {type : String, required: true},
    ansC : {type : String, required: true},

}, {timestamps : true, versionKey : false})

const ModelQues = mongoose.model("ModelQues", modelQuesSchema);

export default ModelQues;