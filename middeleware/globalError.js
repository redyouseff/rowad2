const { Module } = require("module");
const apiError = require("../utilts/apiError");

const globalError=(err,req,res,next)=>{

    err.statusCode=err.statusCode||500;
    err.status=err.status || "failed";
    if(process.env.NODE_ENV=="development "){

        sendErrorForDev(err,res)

    }

    else{
        if(err.name=="JsonWebTokenError")  err=hanleInvalidSignature()
        if(err.name=="TokenExpiredError")  err=new apiError("expired token ",404)
            SendErrorForProd(err,res)
    }
    

}
const hanleInvalidSignature=()=>new apiError("invalid token",404)

const sendErrorForDev=(err,res)=>{

    res.status(err.statusCode).json({
        statusCode:err.statusCode,
        status:err.status,
        Error:err,
        message:err.message,
        stack:err.stack


    })

}
const SendErrorForProd=(err,res)=>{
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
    })

}

module.exports=globalError;

