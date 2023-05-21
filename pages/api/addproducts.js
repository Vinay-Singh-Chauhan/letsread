import Product from "@/models/product";
import connectDB from "@/middleware/mongoose";
const handler=async (req,res)=>{
    if(req.method==="POST"){
        for(let i=0;i<req.body.length;i++){
            let p= new Product({
                productID:req.body[i].productID,
                category:req.body[i].category,
                printType:req.body[i].printType,
                slug:req.body[i].slug,
                desc:req.body[i].desc,
                img:req.body[i].img,
                name:req.body[i].name,
                qty:req.body[i].qty,
                price:req.body[i].price,
                isbn:req.body[i].isbn,
                author:req.body[i].author,
                edition: req.body[i].edition 
            })
            await p.save()
        }
        res.status(200).json({success:"successfully added"})
    }
    else{
        res.status(400).json({error:"Not Allowed"})
    }
    
}
export default connectDB(handler)