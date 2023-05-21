import React from 'react'
import Image from 'next/image'
import Product from '@/models/product'
import mongoose from 'mongoose'
import Link from 'next/link'
const Biographies = ({products,loggedIn}) => {

  return (
    <section className="text-gray-600 body-font">
      <div className="text-center font-bold text-6xl">Biographies And Autobiographies</div>
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-wrap justify-center">
      {Object.keys(products).map((e)=>{return <Link passhref={"true"} href={`/products/${products[e].slug}`} key={products[e]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg mx-5">
        <div className="block relative rounded overflow-hidden">
          <Image width={"100"} height={"100"} alt="ecommerce" className="sm:w-[50vw] sm:h-[50vh] md:w-[15vw] h-[50vh] block mx-auto" src={`${products[e].img}`}/>
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 ">{products[e].category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{products[e].name}</h2>
          <p className="mt-1">${products[e].price}</p>
          <div className="flex text-center justify-start">
          <p className='font-bold '>Type:</p>
            {products[e].printType.includes("hardcover") && <p className=" mx-2">Hardcover</p>}
            {products[e].printType.includes("Ebook") && <p className="mx-2">Ebook</p>}
            {products[e].printType.includes("paperback") && <p className="mx-2">Paper Back</p>}
          </div>
          <div className="flex text-center justify-start">
            <p className='font-bold'>Editions:</p> {products[e].edition.map((ed)=>{return <p className='mx-2' key ={ed}>{ed}</p>})}

          </div>
          
        </div>
      </Link>})}
      
    </div>
  </div>
</section>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
}
let products=await Product.find({category:"biography"})

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
            // if(item.qty>0){
                categoryObj[item.name].printType=[item.printType];
                categoryObj[item.name].edition=[item.edition];
            // }
        }
    }
  return {
    props: {products:JSON.parse(JSON.stringify(categoryObj))}, // will be passed to the page component as props
  };
}
export default Biographies