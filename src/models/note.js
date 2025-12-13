import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
   
    subjId : { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true  },
    classId : { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true  },
    unitId : { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true  },
    noteTitle : { type: String, required: true },
    noteTitleImg : { type: String, default: "" },
    noteExplanation : { type: String, required: true },
    noteExplanationImg : { type: String, default: "" },


}, {timestamps : true, versionKey : false})

const Note = mongoose.model("Note", noteSchema);

export default Note;