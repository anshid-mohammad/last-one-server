const Razorpay= require("razorpay")


const handlerazorpay=async(req,res)=>{

const razorpay= new Razorpay({
    key_id: 'rzp_test_dvZ4a5WOhieg51', key_secret: 'fds86NFCEMynpqfkHFKDGyCP'   
})

const options={
    amount: req.body.amount,
currency: req.body.currency,
receipt: "receipt#1",
payment_capture:1
}
try{
const response= await razorpay.orders.create(options)
res.json({
    order_id:response.id,
    currency:response.currency,
    amount:response.amount
})
}catch(error){
    res.status(500).send("internal error  razorpay")
    
}
}

const handlepayments=async(req,res)=>{
    const {paymentId}=req.params;
 
    const razorpay= new Razorpay({
       key_id: 'rzp_test_dvZ4a5WOhieg51', key_secret: 'fds86NFCEMynpqfkHFKDGyCP'   
   })
 try {
const payment= await razorpay.payments.fetch(paymentId)

if(!paymenn){
return res.status(500).json("error at razorpay loading")
}
res.json({
    status:payment.status,
    method:payment.method,
    amount:payment.amount,
    currency:payment.currency,

})

  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      message: 'Error fetching courses',
      error: error.message,
    });
  }
}

module.exports={handlerazorpay,handlepayments}