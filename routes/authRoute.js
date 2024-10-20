const express=require("express");

const {signup,reasizeImage,uploadImage,login,forgetPassword,verifyResetCode,resetPassword,getLoggedUser, protect} =require("../services/authService");
const { route } = require("./userRoute");

const router=express.Router();

router.route("/signup").post(uploadImage,reasizeImage,signup);
router.route("/login").post(login);
router.route("/forgetPassword").post(forgetPassword)
router.route("/verifyResetCode").post(verifyResetCode);
router.route("/resetPassword").post(resetPassword)
router.route("/loggedUser").get(protect,getLoggedUser)



module.exports=router



