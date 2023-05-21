import User from "@/models/user";
var jwt = require('jsonwebtoken');
import connectDB from "@/middleware/mongoose";
const handler=async (req,res)=>{
    if(req.method==="POST"){
        let decoded_jwt=jwt.decode(req.body.token,process.env.JWT_SECRET);
        let email=decoded_jwt.email;

        let user=await User.findOne({email:email})
        if(!user){
            res.status(400).json({success:false,response:"Not Allowed"})
            return
        }

       res.status(200).json({success:true,response:{"name":user.name,"phone":user.phone,"email":user.email,"address":user.address,"state":user.state,"city":user.city,"pincode":user.pincode}})
    }
    else{
        res.status(400).json({success:false,response:"Not Allowed"})
    }
    
}
export default connectDB(handler)