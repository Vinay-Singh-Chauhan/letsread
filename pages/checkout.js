import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
const Checkout = ({ removeFromCart, addToCart, cart, subTotal, isBuyNow }) => {
  const router=useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [servicibilty, setServicibilty] = useState(false);
  const [disabledCheckout, setDisabledCheckout] = useState(true);
  const getUser=async()=>{
    let a= await fetch(`http://${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({token:localStorage.getItem("token")}), // body data type must match "Content-Type" header
    })
    let res= await a.json();

    if(res.success){

      setEmail(res.response.email)
      setName(res.response.name)
// setEmail("")
setPincode(res.response.pincode)
// setState("")
// setCity(res.response.city)
setPhone(res.response.phone)
setAddress(res.response.address)
onCheckPin(res.response.pincode)
if (res.response.name.length && res.response.address.length && res.response.pincode.length ) {
  setDisabledCheckout(false);
  
} else {
  setDisabledCheckout(true);
}
      return;
      // return {success:true,response:res.response}
    }
    else{
      router.push('/')
    }
    // return {success:false,response:"Error"};
  }
  const resetStates=()=>{
    setName("")
// setEmail("")
setPincode("")
setState("")
setCity("")
setPhone("")
setAddress("")
setOldPassword("")
setNewPassword("")
// setDisabledUpdate(true)
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      getUser()
      
    }else{
      router.push("/")
    }
  }, [])
  
  const onCheckPin=async (value)=>{
    let pins =await fetch(`http://${process.env.NEXT_PUBLIC_HOST}/api/pins`);
    let pinsjson=await pins.json();
    if(Object.keys(pinsjson).includes(value)){
      setState(pinsjson[value][1])
      setCity(pinsjson[value][0])
      setServicibilty(true);
    }else{
      setState('')
      setCity('')
      setServicibilty(false);
    }
  }
  const onChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
      // =name;
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } 
    else if (e.target.name == "address") {
      setAddress(e.target.value);
    } 
    else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } 
    else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      onCheckPin(e.target.value)
    }
    if (name.length && address.length && pincode.length && email.length) {
      setDisabledCheckout(false);
      
    } else {
      setDisabledCheckout(true);
    }
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    if(!servicibilty){
      alert("pincode not servicable")
    }
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch(
      `http://${process.env.NEXT_PUBLIC_HOST}/api/razorpay`,
      {
        method: "POST",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          cart: cart,
          amount: subTotal,
          name: name,
          address: address,
          pincode: pincode,
          state: state,
          city: city,
          email: email,
        }),
      }
    ).then((t) => t.json());


    if(data.success){

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: data.response.MerchantName,
      currency: data.response.currency,
      amount: data.response.amount,
      order_id: data.response.id,
      description: "Thankyou for your Order",
      image: "https://manuarora.in/logo.png",
      handler: async function (response) {

        // Validate payment at server - using webhooks is a better idea.
        // let id;

        if (response.razorpay_payment_id) {
          let id=await fetch(`http://${process.env.NEXT_PUBLIC_HOST}/api/postOrder`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ order_id: response.razorpay_order_id }), // body data type must match "Content-Type" header
          }).then((t)=>t.json());
        id=await JSON.parse(JSON.stringify(id))

        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        alert(response.razorpay_payment_id);
        
        window.location=`http://${process.env.NEXT_PUBLIC_HOST}/order?order_id=${id.id}`}
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();}
    else{
      alert(data.response);
    }
  };
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Check Out
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify.
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <h2>Delivery Details</h2>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  value={name}
                  onChange={onChange}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                readOnly
                  value={email}
                  onChange={onChange}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                  value={address}
                  onChange={onChange}
                  id="address"
                  name="address"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                  value={state}
                  onChange={onChange}
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>{" "}
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                  value={city}
                  onChange={onChange}
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>{" "}
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  PIN Code
                </label>
                <input
                  value={pincode}
                  onChange={onChange}
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {!servicibilty && <p
                  className="leading-7 text-sm text-red-600"
                >
                  Enter a servicable pincode
                </p>}
              </div>
            </div>{" "}
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="phone"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                value={phone}
                onChange={onChange}
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className=" py-5 px-2  bg-blue-100">
                <div className="heading text-xl font-bold text-center py-3">
                  Your Books
                </div>
                <div className="items flex flex-col ">
                  {Object.keys(cart).length === 0 && (
                    <div className="text-center m-2">Cart is Empty</div>
                  )}
                  <ol className="list-decimal">
                    {Object.keys(cart).map((e) => {
                      return (
                        <div
                          key={e}
                          className="item  mx-auto justify-center w-full  border-b flex-row flex text-center"
                        >
                          <li className="flex flex-row justify-center w-full">
                            <div className="item-name text-center py-4 w-3/4 h-16 ">
                              {cart[e].name}
                            </div>

                            <div className="item-qty text-center flex flex-row justify-center py-4 w-1/4 ">
                              <div className="">
                                <AiOutlineMinusCircle
                                  onClick={() => {
                                    removeFromCart(e, 1);
                                  }}
                                  className="text-center mt-1"
                                />
                              </div>
                              <div className="mx-2">{cart[e].qty}</div>
                              <div className=""></div>
                              <AiOutlinePlusCircle
                                className="text-center mt-1"
                                onClick={() => {
                                  addToCart(
                                    e,
                                    cart[e].name,
                                    1,
                                    cart[e].price,
                                    cart[e].isbn,
                                    cart[e].author,
                                    cart[e].edition
                                  );
                                }}
                              />
                            </div>
                          </li>
                        </div>
                      );
                    })}
                  </ol>
                </div>
                <div className="buttons flex flex-row justify-around m-4">
                  <div className="subtotal">Subtotal: ${subTotal}</div>
                </div>
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                disabled={disabledCheckout}
                onClick={() => {
                  makePayment();
                }}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Pay ${subTotal}
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <a className="text-indigo-500">example@email.com</a>
              <p className="leading-normal my-5">
                49 Smith St.
                <br />
                Saint Cloud, MN 56301
              </p>
              <span className="inline-flex">
                <a className="text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="ml-4 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="ml-4 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="ml-4 text-gray-500">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
Checkout.defaultProps = {
  isBuyNow: "false",
};

export default Checkout;
