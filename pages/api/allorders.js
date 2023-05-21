import Order from "@/models/order";
var jwt = require('jsonwebtoken');
import connectDB from "@/middleware/mongoose";
const handler=async (req,res)=>{
    if(req.method==="POST"){
        let data= jwt.verify(req.body.token,process.env.JWT_SECRET)

        let a=await Order.find({userID:data.email})

        
        res.status(200).json({orders:a})
        
    }
    else{
        res.status(400).json({error:"Not Allowed"})
    }
    
}
export default connectDB(handler)