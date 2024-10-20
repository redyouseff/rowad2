const mongoose=require("mongoose");

const  orderShema= new  mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:[true,"oredr must belong to an users"]
    },
    cartItems:[
        {
            course:{
                type:mongoose.Schema.ObjectId,
                ref:"course",
            
            },
            price:Number
        }
    ],
    totailPrice:Number,
    paidAt:Date,
    

})

const orderModel=new mongoose.model("order",orderShema)

module.exports=orderModel