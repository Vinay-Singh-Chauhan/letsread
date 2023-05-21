import User from "@/models/user";
var jwt = require('jsonwebtoken');
import connectDB from "@/middleware/mongoose";
var {AES,enc} = require("crypto-js");
const handler=async (req,res)=>{
    if(req.method==="POST"){
        let user=await User.findOne({email:req.body.email})
        
       
        if(user){ 

            const d= AES.decrypt(user.password, process.env.ENCRYPTION_KEY)
        const p=(d.toString(enc.Utf8))

            var token = jwt.sign({email:req.body.email}, process.env.JWT_SECRET,{expiresIn:"2d"});
            if(req.body.password=== p){
                res.status(200).json({success:true,token:token})
            }else{
                res.status(200).json({success:false})
            }
        }else{

            res.status(200).json({success:false})
        }
    }
    else{
        res.status(400).json({error:"Not Allowed"})
    }
    
}
export default connectDB(handler)