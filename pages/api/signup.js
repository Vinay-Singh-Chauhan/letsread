import User from "@/models/user";
import connectDB from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
const handler=async (req,res)=>{
    if(req.method==="POST"){
        
        let newUser=new User({
            userID:req.body.userID,
            name:req.body.name,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPTION_KEY).toString(),
            phone:parseInt(req.body.phone),
            email:req.body.email,
        })
        await newUser.save()
        var token = jwt.sign({email:req.body.email}, process.env.JWT_SECRET,{expiresIn:"2d"});
        res.status(200).json({success:true,response:token})
    }
    else{
        res.status(400).json({error:false,response:"Not Allowed"})
    }
    
}
export default connectDB(handler)