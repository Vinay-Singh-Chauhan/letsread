import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  order_id:{type:String,required:true},
  
  userID: {type:String,required:true}, // String is shorthand for {type: String}
  products:[{
    // slug:{type:String,required:true},
    name:{type:String,required:true},
    productID:{type:String,required:true},
    qty:{type:Number,required:true,default:1},
    price:{type:Number,required:true}
  }] ,
  address: {type:String,required:true},
  amount:{type:Number,required:true},
  status:{type:String,default:"Pending"},
  pincode:{type:String},
  city:{type:String},
  state:{type:String}
},{timestamps:true});
mongoose.models={}
export default mongoose.model("Order",orderSchema);