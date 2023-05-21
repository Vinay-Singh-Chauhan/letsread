import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  
    userID:{type:String,required:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true,default:0},
    address:{type:String},
    state:{type:String},
    city:{type:String},
    pincode:{type:String},
}
);
mongoose.models={}
export default mongoose.model("User",userSchema);