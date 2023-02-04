import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import pincodes from "../../pincode.json"

const handler = async (req, res) => {

  // Check if the cart is tampered with
  let product,sumTotal=0;
  let cart=req.body.cart;
  for(let item in cart){
    sumTotal+=cart[item].price*cart[item].qty
    product=await Product.findOne({slug:item})
    if(product.availableQty < cart[item].qty){
      res.status(200).json({success: false, "error":"Some items in your cart went Out of Stock. Please try again"})
      return
    }
    if(product.price!=cart[item].price){
      res.status(200).json({success: false, "error":"The price of some items of your cart has changed. Please try again"})
      return
    }
  }

  if(!Object.keys(pincodes).includes(req.body.pincode)){
    res.status(200).json({success: false, "error":"The PIN code you have entered is not serviceable!"})
    return
  }

  if(sumTotal!=req.body.subTotal){
    res.status(200).json({success: false, "error":"The price of some items of your cart has changed. Please try again"})
    return
  }

  // Validate details
  if(req.body.phone.length!==10 && !Number.isInteger(Number(req.body.phone))){
    res.status(200).json({success: false, "error":"Please enter a 10-digit phone number"})
    return
  }
  if(req.body.pincode.length!==6 && !Number.isInteger(Number(req.body.pincode))){
    res.status(200).json({success: false, "error":"Please enter a 6-digit pincode"})
    return
  }

  if (req.method == "POST") {
    let order=new Order({
        email: req.body.email,
        orderId: req.body.oid,
        amount: req.body.subTotal,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        name: req.body.name,
        pincode: req.body.pincode,
        phone: req.body.phone,
        products: req.body.cart
    })
    await order.save()
    res.status(200).json({ orderId: req.body.oid,success: "Success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  } 
};

export default connectDb(handler);
