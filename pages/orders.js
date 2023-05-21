import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const Orders = () => {
  const [orders, setOrders] = useState([])
  const router=useRouter()
  useEffect(() => {
    const fecthOrders = async () => {
      let token = localStorage.getItem("token");
      let allorders = await fetch(
        `http://${process.env.NEXT_PUBLIC_HOST}/api/allorders`,
        {
          method: "POST", 
          credentials: "same-origin", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token:token
          }), 
        }
      );
      let res = await allorders.json()

      setOrders(res.orders)
     
    };
    if (localStorage.getItem("token")) {
      fecthOrders();

    } else {
      router.push("/");
    }
  }, []);

  return (
    <div className="container w-full md:w-[80vw] mx-auto flex flex-col">
      <h1 className="text-lg">Orders</h1>
      <div className="flex flex-col">
        {orders.map((k)=>{

          return <div key={k._id} className="flex flex-col my-5">
            <div>{k.userID}</div>
            <div>{k.status}</div>
            <div>{k._id}</div>
         { Object.keys(k.products).map((e)=>{

            return <div key={k.products[e].productID} className="flex flex-row">
                  <div >{k.products[e].productID}</div>
                  <div className="mx-3">Name: {k.products[e].name}</div>
                  <div className="mx-3">Quantity: {k.products[e].qty}</div>
                  <div className="mx-3">Price: {k.products[e].price}</div>
            </div>
            })}
              {k.products[0].name}
            </div>
          })
            
          }
      </div>
    </div>
  );
};

export default Orders;
