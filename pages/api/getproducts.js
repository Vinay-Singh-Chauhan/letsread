import Product from "@/models/product";
import connectDB from "@/middleware/mongoose";
const handler=async (req,res)=>{
    if(req.method==="GET"){
    let products=await Product.find({category:req.query.category})

    let categoryObj={}
    for(let item of products){
        if(item.name in categoryObj){
            if(!categoryObj[item.name].printType.includes(item.printTypes) && item.qty >0){
                categoryObj[item.name].printType.push(item.printType)
            }
            if(!categoryObj[item.name].edition.includes(item.edition) && item.qty >0){
                categoryObj[item.name].edition.push(item.edition)
            }
        }else{
            categoryObj[item.name]=JSON.parse(JSON.stringify(item))
            if(item.qty>0){
                categoryObj[item.name].printType=[item.printType];
                categoryObj[item.name].edition=[item.edition];
            }
        }
    }

    res.status(200).json({products})}
    else{
        res.status(200).json({success:false})
    }
}
export default connectDB(handler)