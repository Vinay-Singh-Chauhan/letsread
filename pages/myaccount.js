import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
const Myaccount = () => {
  const router= useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [disabledUpdate, setDisabledUpdate] = useState(true);
  const onCheckPin=async (value)=>{
    let pins =await fetch(`http://${process.env.NEXT_PUBLIC_HOST}/api/pins`);
    let pinsjson=await pins.json();
    if(Object.keys(pinsjson).includes(value)){
      setState(pinsjson[value][1])
      setCity(pinsjson[value][0])
      // setServicibilty(true);
    }else{
      setState('')
      setCity('')
      // setServicibilty(false);
    }

  }
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

      setPhone(res.response.phone)

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
setDisabledUpdate(true)
  }
  const updateUser= async()=>{
    let a= await fetch(`http://${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({token:localStorage.getItem("token"),
        name:name,
        state:state,
        city:city,
        pincode:pincode,
        newPassword:newPassword,
        address:address,
        phone:phone,
        oldPassword:oldPassword
    
    }), // body data type must match "Content-Type" header
    })
    let res= await a.json();

    if(res.success){

      alert("Updation Done")
      // localStorage.removeItem("token")
      resetStates()
      return;
      // return {success:true,response:res.response}
    }
    else{
      alert("Some Error. Please check Old Password or other discrepencies")
      resetStates()
      // router.push('/')
    }
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      getUser()
    }else{
      router.push("/")
    }
  }, [])
  
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
    else if (e.target.name == "newPassword") {
      setNewPassword(e.target.value);
    } 
    else if (e.target.name == "oldPassword") {
      setOldPassword(e.target.value);
    } 
    else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } 
    else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      onCheckPin(e.target.value)
    }
    if (name.length || address.length || pincode.length  || newPassword.length || phone.length)  {
      setDisabledUpdate(false);
      
    } else {
      setDisabledUpdate(true);
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Update Account Details
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Change various Account Details and Password
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <h2>Personal Information</h2>
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
                  value={email}
                  readOnly
                  // onChange={onChange}
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
            </div>
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
            
            
          </div>
          <h2>Update Password</h2>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="newPassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  New Password
                </label>
                <input
                  value={newPassword}
                  // readOnly
                  onChange={onChange}
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="oldPassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Old Password
                </label>
                <input
                  value={oldPassword}
                  onChange={onChange}
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            
            
            
            <div className="p-2 w-full">
              <button
                disabled={disabledUpdate}
                onClick={updateUser}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Update
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
  )
}

export default Myaccount