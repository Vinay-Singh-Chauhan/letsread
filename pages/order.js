import Image from "next/image";
import React from "react";
import { mongoose } from "mongoose";
import Order from "@/models/order";

import Error404 from "@/components/Error404";

const MyOrder = ({ order,error }) => {
  // const router=useRouter();
  
  if(error){
    return <Error404/>
  }
  
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-2 mx-auto text-2xl flex justify-between align-text-bottom items-center">
                  <p className="align-text-bottom">
                  Order ID #{order.order_id}</p>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                      Print Summary
                    </button>
                </div>
                
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {order.products.map((e) => {
            return (
              <div
                key={e._id}
                className="g:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 flex flex-row"
              >
                
                <div className="order-item lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 ">
                  
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    BRAND NAME
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {e["name"]}
                  </h1>
                  <div className="flex mb-4">
                    <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                      Description
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Reviews
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Details
                    </a>
                  </div>
                  <p className="leading-relaxed mb-4">
                    Fam locavore kickstarter distillery. Mixtape chillwave
                    tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam
                    inxigo juiceramps cornhole raw denim forage brooklyn.
                    Everyday carry +1 seitan poutine tumeric. Gastropub blue
                    bottle austin listicle pour-over, neutra jean.
                  </p>

                  {Object.keys(e).map((k) => {
                    return (
                      <div
                        className="flex border-t border-gray-200 py-2"
                        key={k}
                      >
                        <span className="text-gray-500">{k}</span>
                        <span className="ml-auto text-gray-900">
                          {e[k]}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${e.price * e.qty}
                    </span>
                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                      Button
                    </button>
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <Image
                  width={"100"}
                  height={"100"}
                  alt="ecommerce"
                  className="lg:w-1/2  lg:h-[80vh] h-64 object-cover object-center rounded"
                  src="/book.jpg"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI);
}
let order=await Order.findById(context.query.order_id)
if(!order){
  return {
    props: {error:true}, // will be passed to the page component as props
  };
}
  return {
    props: {order:JSON.parse(JSON.stringify(order)),error:false}, // will be passed to the page component as props
  };
}
export default MyOrder;
