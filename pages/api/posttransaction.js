import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";

const handler = async (req, res) => {
  // Update order stocks
  if (req.method == "POST") {
    let order = await Order.findOne({ orderId: req.body.order.orderId });
    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate({ slug: slug }, { $inc: { availableQty: -products[slug].qty } });
    }
    res.status(200).json({ success: "true" });
  }
};

export default connectDb(handler);
