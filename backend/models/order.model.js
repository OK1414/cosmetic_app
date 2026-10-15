import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
             price: {
                type: Number,
                required: true
            }
        }
    ],
     shippingAddress: {
        address: String,
        city: String,
        state: String,
        pincode: String
    },
    orderStatus: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Pending"
    }
});


const Order = mongoose.model("Order", orderSchema);
export default Order;
