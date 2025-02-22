const express = require("express");
const router = express.Router();
const {handlerazorpay, handlepayments} =require("../middlewares/razorpay")


router.post("/orders",handlerazorpay)
router.get("/payments/:paymentId",handlepayments)


module.exports=router