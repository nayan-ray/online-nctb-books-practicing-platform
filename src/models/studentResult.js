import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
   
    studentId : { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true  },
    subjName : { type: String, required: true  },
    className : { type: String, required: true  },
    total : { type: Number, required: true  },
    correct: { type: Number, required: true  },
    unitId : { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true  },

}, {timestamps : true, versionKey : false})

const Result = mongoose.model("Result", resultSchema);

export default Result;