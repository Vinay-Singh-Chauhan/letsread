import User from "@/models/user";
var jwt = require('jsonwebtoken');
import connectDB from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
const handler=async (req,res)=>{
    if(req.method==="POST"){
        let decoded_jwt=jwt.decode(req.body.token,'jsonsecert');
        let email=decoded_jwt.email;

        let user=await User.findOne({email:email})
        let serverSideOldPassword=CryptoJS.AES.decrypt(user.password,process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        if(serverSideOldPassword!==req.body.oldPassword){
            res.status(500).json({success:false,response:"Password mismatch"})
            return;
        }
        let newUser={};
        if(req.body.newPassword && req.body.newPassword.length>0){
            newUser["password"]=CryptoJS.AES.encrypt(req.body.newPassword,process.env.ENCRYPTION_KEY).toString()
        }

       
       newUser["userID"]=req.body.userID ? req.body.userID: user.userID,
       newUser["name"]=req.body.name? req.body.name:user.name,
       
        newUser["phone"]=req.body.phone? req.body.phone: user.phone,
        newUser["address"]=req.body.address? req.body.address: user.address,
        newUser["state"]=req.body.state? req.body.state : user.state,
        newUser["city"]=req.body.city? req.body.city : user.city,
        newUser["pincode"]=req.body.pincode? req.body.pincode : user.pincode,
        
        await User.findOneAndUpdate({email:email},newUser)
       res.status(200).json({success:true,response:"done"})
    }
    else{
        res.status(400).json({success:false,response:"Not Allowed"})
    }
    
}
export default connectDB(handler)