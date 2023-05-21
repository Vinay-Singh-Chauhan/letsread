import User from "@/models/user";
import connectDB from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
const handler=async (req,res)=>{
    if(req.method==="POST"){
        
        let newUser=new User({
            userID:req.body.userID,
            name:req.body.name,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPTION_KEY).toString(),
            phone:req.body.phone,
            email:req.body.email,
        })
        await newUser.save()
        res.status(200).json({success:"user added successfully"})
    }
    else{
        res.status(400).json({error:"Not Allowed"})
    }
    
}
export default connectDB(handler)