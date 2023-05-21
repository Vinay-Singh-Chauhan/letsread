import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  
    productID:{type:String,required:true},
    category:{type:String,required:true},
    printType:{type:String,required:true},
    slug:{type:String,required:true , unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    name:{type:String,required:true},
    qty:{type:Number,required:true,default:1},
    price:{type:Number,required:true},
    isbn:{type:String,required:true},
    author:{type:String,required:true},
    edition:{type:Number,required:true}

}
);
mongoose.models={}
export default mongoose.model("Product",productSchema);