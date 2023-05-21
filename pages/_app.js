import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Checkout from "./checkout";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router=useRouter()
  const [cart, setCart] = useState({});
  const [loggedIn, setLoggedIn] = useState();
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    
    try {
      if (localStorage.getItem("cart")) {

        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
        
      }
      let a=localStorage.getItem("token");
        if(a){
          setLoggedIn(true);
        }
    } catch (e) {

      localStorage.removeItem("cart");
    }
  }, []);
  
const [key, setKey] = useState(Math.random());
const logOut=()=>{

  
    localStorage.removeItem("token")
    setLoggedIn(false);
    setKey(Math.random());
  
}
  const addToCart = (itemCode, name, qty, price, isbn, author, edition) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { name: name, qty: 1, price, isbn, author, edition };
    }
    setCart(newCart);
    saveCart(newCart);

  };
  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty -= qty;
    }

    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
    // setSubTotal(0);
  };
  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart));
    let keys = Object.keys(mycart);
    let subt = 0;
    for (let i = 0; i < keys.length; i++) {
      subt += mycart[keys[i]].price * mycart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const buyNow=(itemCode, name, qty, price, isbn, author, edition) => {
    let newCart = {};
    let oldCart=cart;
    newCart[itemCode] = { name: name, qty: 1, price, isbn, author, edition };
    // setSubTotal(price)
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  }
  return (
    <>
      <Navbar
        key={key}
        logOut={logOut}
        loggedIn={loggedIn}
      // Rkey={subTotal}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        saveCart={saveCart}
        subTotal={subTotal}
      ></Navbar>
      <Component
      loggedIn={loggedIn}
      setKey={setKey}
      setLoggedIn={setLoggedIn}
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        saveCart={saveCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer></Footer>
    </>
  );
}
