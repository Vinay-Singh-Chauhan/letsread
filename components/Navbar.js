import Link from 'next/link';
import {React,useRef, useState} from 'react'
import { AiOutlineShoppingCart ,AiFillCloseCircle,AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import {MdOutlineAccountCircle} from 'react-icons/md';


const Navbar = ({loggedIn,logOut,removeFromCart,addToCart,clearCart,cart,subTotal}) => {
  const [drop, setdrop] = useState(false)
  const ref=useRef()
  const toggleCart=()=>{
  if(ref.current.classList.contains("translate-x-full")){
    ref.current.classList.remove("translate-x-full")
    ref.current.classList.add("translate-x-0")
  }else{
    ref.current.classList.add("translate-x-full")
    ref.current.classList.remove("translate-x-0")
  }
}
  return (
    
        <header className="text-gray-600 body-font shadow-md sticky top-0 bg-white z-10">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <Link href={'/'}><span className="ml-3 text-xl text-gray-500">LetsRead</span></Link>
    </div>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link href={"/fictions"} className="mr-5 hover:text-gray-900">Fictions</Link>
      <Link href={"/biographies"} className="mr-5 hover:text-gray-900">Biographies</Link>
      <Link href={"/journals"} className="mr-5 hover:text-gray-900">Journals</Link>
      <Link href={"/essays"} className="mr-5 hover:text-gray-900">Essays</Link>
    </nav>
    <div className="flex relative items-center  py-1 px-3 rounded  mt-4 md:mt-0">
      <div href="" className='text-xl mx-2'>{ drop && <div  onMouseLeave={()=>{setdrop(false)}} className="absolute  z-12 bg-blue-200 top-6 right-0 h-fit min-w-fit w-[10vw] ">
        <ul>
          {!loggedIn && <Link href="/login"><li className='cursor-pointer hover:bg-violet-500 hover:text-white block py-1 px-1 text-sm'>Login</li></Link>}
          {loggedIn && <Link href="/myaccount"><li className='cursor-pointer hover:bg-violet-500 hover:text-white block py-1 px-1 text-sm'>Account</li></Link>}
          {loggedIn && <Link href="/orders"><li className='cursor-pointer hover:bg-violet-500 hover:text-white block py-1 px-1 text-sm'>Orders</li></Link>}
          {loggedIn && <Link href="/"><li className='cursor-pointer hover:bg-violet-500 hover:text-white block py-1 px-1 text-sm'onClick={logOut}>Logout</li></Link>}
          
          
          </ul></div>}<MdOutlineAccountCircle onMouseEnter={()=>{setdrop(!drop)}}  /></div>
      <AiOutlineShoppingCart className='text-xl cursor-pointer' onClick={toggleCart}/>
      
    </div>
  </div>
 

  {/* sidecart */}
  <div ref={ref} className=" overflow-y-scroll absolute transform transition-transform translate-x-full top-0 right-0 py-5 px-2 lg:w-1/4 md:w-1/4 sm:w-1/2 max-sm:w-full h-[100vh] min-h-full  bg-blue-400">
    <div onClick={toggleCart} className="close absolute top-4 right-4 text-2xl"><AiFillCloseCircle/></div>
    <div className="heading text-xl font-bold text-center py-3">Your Books</div>
    <div className="items flex flex-col ">
      {Object.keys(cart).length===0 && <div className="text-center m-2">Cart is Empty</div>
       }
      {Object.keys(cart).map((e)=>{return <div key={e} className="item w-full  border-b flex-row flex text-center">
        <div className="item-name text-center py-4 w-3/4 h-16 bg-gray-400">{cart[e].name}</div>
        
        <div className="item-qty text-center flex flex-row justify-center py-4 w-1/4 bg-gray-300">
          <div className=""><AiOutlineMinusCircle onClick={()=>{removeFromCart(e,1)}} className='text-center mt-1'/></div><div className='mx-2'>{cart[e].qty}</div><div className=""></div><AiOutlinePlusCircle className='text-center mt-1' onClick={()=>{addToCart(e,"silversatzh",1,299,"1224142255","dr.Paradox",10)}}/></div>
        </div>})}
        
        
      </div>
      <div className="buttons flex flex-row justify-around m-4">
                  <div className="subtotal">Subtotal: ${subTotal}</div>
                </div>
      <div className="buttons flex flex-row justify-around m-4">
        <button onClick={clearCart} className='min-w-1/3 w-fit p-1 min-h-8 h-fit bg-slate-50 text-black'>Clear Cart</button>
        <Link  href={"/checkout"}><button className='min-w-1/3 w-fit p-1 min-h-8 h-fit bg-green-400 text-white'>Checkout</button></Link>
      </div>
  </div>
</header>
    
  )
}

export default Navbar
