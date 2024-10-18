const courseModel = require("../models/courseModel");
const asyncHandler= require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt=require("bcrypt");
const apiError = require("../utilts/apiError");
const orderModel = require("../models/orderModel");
const { cartModel } = require("../models/cartModel");

const createOrder=asyncHandler(async(req,res,next)=>{
const cart=await cartModel.findOne({user:req.currentUser._id})

const user=await userModel.findById(req.currentUser._id)
if(!cart){
    return next (new apiError(`there is no cart for this id ${req.currentUser._id}`,400));
}
const order=await orderModel.create({
    user:req.currentUser._id,
    cartItems:cart.cartItems,
    totailPrice:cart.totalPrice,
    paidAt:Date.now()
})

if(order){
    cart.cartItems.map(async(item)=>{
        await courseModel.findByIdAndUpdate(item.course,{
            $inc:{ sold: +1}
        })
       
        await userModel.findByIdAndUpdate(req.currentUser._id,{
            $push:{course: item.course}
        })
       
        
    })
    
}
await cartModel.findOneAndDelete({user:req.currentUser._id})

res.status(200).json({data:order});

})


module.exports={createOrder}

