const Order = require("../models/Order");
const Product = require("../models/Product");

/**Create Order */
exports.orderNew = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(201).json({
        success: true,
        message:"Order placed successfully via cash on delivery",
        order
    })
  } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
  }
};

/**get singal order */

exports.getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user" , "name email");
        if(!order){
            return res.status(404).json({
                success: false,
                message: `Order does not exist with this id ${req.params.id}`
            })
        }
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**get logged in user Orders */

exports.myOrders = async (req, res) => {
    try {
        const order = await Order.find({user: req.user._id});
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

/**get all admin orders */

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        let totalAmount = 0;
        orders.forEach((order) => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            orders,
            totalAmount
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/**update order status admin */

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).json({
                success: false,
                message: `Order does not exist with this id ${req.params.id}`
            })
        }
        if(order.orderStatus === "Delivered"){
            return res.status(400).json({
                success: false,
                message: "you have already delivered this order"
            })
        }
        if(req.body.status === "Shipped"){
            order.orderItems.forEach(async(o) => {
                await updateStock(o.product, o.quantity);
            })
        }
        order.orderStatus = req.body.status;
        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now();
        }
        await order.save({validateBeforeSave: false});
        res.status(200).json({
            success: true,
            message: "order status change successfully",
            order
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


/**update Stock Function */
async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({validateBeforeSave: false});
}


/**delete order (admin) */

exports.deleteOrders = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if(!order){
            return res.status(400).json({
                success: false,
                message: `Order Does not Exist with this ${req.params.id}`
            })
        }
        await order.remove();
        res.status(200).json({
            success:true,
            message:"Successfully Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}