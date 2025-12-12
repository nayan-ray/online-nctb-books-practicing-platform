import mongoose from 'mongoose';
import {Mongo_connect_url} from "../../secret.js"
import 'dotenv/config'

export const connectDb = async ()=>{
   try {
    await  mongoose.connect(Mongo_connect_url);
    console.log("database connected successfully");
   
   } catch (error) {
      console.log(error.message);
      
   }


}

