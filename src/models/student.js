import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
        trim : true,
        required : [true, "Password is required"],
        min : [6, "Password must be at least 6 characters long"],
        max : [15, "Password must be at most 15 characters long"],
        set : (v)=>{
            return bcrypt.hashSync(v, bcrypt.genSaltSync(10)); 
        }
    },
    image : {type : String, default : ""},
    isBanned : { type: Boolean, default: false  },
    admin : { type: Boolean, default: false  },
    address : { type: String, default : "" },
    phone : {
        type: String,
        validate : {
            validator : (v)=>{
                return /^(?:\+880|880|0)1[3-9]\d{8}$/.test(v)
            },
            message : props => `${props.value} is not a valid phone number`
        },
        required : [true, "Phone number is required"]
    }

},
{timestamps : true, versionKey : false}
)

const Student = mongoose.model("Student", studentSchema);

export default Student;