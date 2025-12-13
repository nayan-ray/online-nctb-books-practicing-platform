import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    unitName : { type: String, required: true, unique: true },
    subjId : { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true  },
    classId : { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true  }
}, {timestamps : true, versionKey : false})

const Unit = mongoose.model("Unit", unitSchema);

export default Unit;