import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : {
         type: String,
         unique: true,
         required : [true, "Email is required"],
         validate : {
            validator : (v)=>{
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

            },
            message : props => `${props.value} is not a valid email`
         }
        },
    classId : { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true  }, 
    password : {
        type: String,
        required : [true, "Password is required"],
        min : [6, "Password must be at least 6 characters long"],
        max : [15, "Password must be at most 15 characters long"]
    },
    image : {type : String, default : ""},
    ban : { type: Boolean, default: false  },
    admin : { type: Boolean, default: false  },

},
{timestamps : true, versionKey : false}
)

const Student = mongoose.model("Student", studentSchema);

export default Student;