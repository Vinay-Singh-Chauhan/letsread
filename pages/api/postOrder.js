import Order from "@/models/order";
import connectDB from "@/middleware/mongoose";
import Product from "@/models/product";
const handler=async (req,res)=>{
    if(req.method==="POST"){
        let a=await Order.findOneAndUpdate({order_id:req.body.order_id},{status:"paid"})
        for(let item of a.products){
            await Product.findOneAndUpdate({slug:item.productID},{$inc :{qty:-item.qty}});
            
        }
        if(a.order_id){ 
                res.status(200).json({id:a._id.toString()})
            }
        else
        res.status(200).json({success:false})
    }
    else{
        res.status(400).json({error:"Not Allowed"})
    }
    
}
export default connectDB(handler)