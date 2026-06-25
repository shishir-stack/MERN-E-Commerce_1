import { mongoose } from 'mongoose';

const orderSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    items:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    address:{
        type:Object,
        required:true,
    },
     status:{
        type:String,
        required:true,
        default:'Order Placed'
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    payment:{
        type: Boolean,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },

},{timestamps:true})


const Order = mongoose.model ('Order',orderSchema)

export default Order

