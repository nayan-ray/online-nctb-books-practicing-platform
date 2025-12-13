import mongoose from "mongoose";

const subjSchema = new mongoose.Schema({
    subjName : { type: String, required: true},
    classId : { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true  }
},{timestamps : true, versionKey : false});

const Subject = mongoose.model("Subject", subjSchema);

export default Subject;