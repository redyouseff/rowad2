const { protect,allowedTo } = require("../services/authService");
const {createOrder}=require("../services/orderService.js");

const express =require("express");
const router=express.Router();

router.route("/").post(protect,createOrder)

module.exports=router
