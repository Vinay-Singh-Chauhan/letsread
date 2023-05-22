import Link from 'next/link'
import {  useRouter } from 'next/router'
import React, { useState,useEffect } from 'react'

const Login = ({setLoggedIn,setKey}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router=useRouter()
  const onChangeInput=(e)=>{
    if(e.target.name==="password"){
      setPassword(e.target.value)
    }
    else if(e.target.name==="email"){
      setEmail(e.target.value)
    }
  }

useEffect(() => {
  if(localStorage.getItem("token")){
    router.push("/")
  }

  
}, [])

  const onLogin=async ()=>{
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({email:email,password:password}), // body data type must match "Content-Type" header
    });
    let res=await response.json()

    if(res.success){

      localStorage.setItem("token",res.token)
      setLoggedIn(true);
      setKey(Math.random())
      router.push("/")
    }else{

      alert("login failed")
    }
  
  }
  return (
    <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex flex-wrap flex-row-reverse items-center">
      <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
        <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
      </div>
      <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:mr-auto w-full mt-10 md:mt-0">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input onChange={onChangeInput}  value={email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <div className="relative mb-4">
          <label htmlFor="password"  className=" leading-7 text-sm text-gray-600">Password</label>
          <input onChange={onChangeInput} value={password} type="password"  id="password" name="password" className=" w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <button onClick={onLogin} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Log In</button>
        <p className="text-xs text-gray-500 mt-3">Don't have an account, {<Link href={"/signup"} className=' text-blue-600 underline'>Sign up</Link>}</p>
      </div>
    </div>
  </section>
  )
}

export default Login