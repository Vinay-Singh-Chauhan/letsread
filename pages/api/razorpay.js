const Razorpay = require("razorpay");
const shortid = require("shortid");
import connectDB from "@/middleware/mongoose";
import Order from "@/models/order";
import Product from "@/models/product";
import mongoose from "mongoose";
const handler = async (req, res) => {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    let products = [];
    let serverSideProduct;
      let serverSideSubTotal = 0;
    for(let e in req.body.cart) {
      serverSideProduct = await Product.findOne({ slug: e });
      if (serverSideProduct.price != req.body.cart[e].price) {
        res.status(400).json({success:false, response: "Tampering detected" });
        return 
      }
      if (serverSideProduct.qty < req.body.cart[e].qty) {
        res.status(400).json({success:false, response: "Some Items went out of stock" });
        return 
      }
      serverSideSubTotal += (serverSideProduct.price * req.body.cart[e].qty);
      products.push({
        productID: e,
        name: req.body.cart[e].name,
        qty: req.body.cart[e].qty,
        price: req.body.cart[e].price,
      });
    };

    

    if (serverSideSubTotal!=req.body.amount) {

      res.status(400).json({success:false, response: "Some changes in price of Cart detected try again" });

      return 
    }
    const payment_capture = 1;
    const amount = parseInt(req.body.amount);
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      let order = new Order({
        order_id: response.id,
        userID: req.body.email,
        products: products,
        address: req.body.address,
        state: req.body.state,
        amount: req.body.amount,
        pincode: req.body.pincode,
        city: req.body.city,
      });
      await order.save();
      res.status(200).json({success:true,response:response});
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
};
export default connectDB(handler);
