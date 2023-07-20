const express = require('express')
const app = express()
const port = 3000
const Razorpay = require('razorpay')
const cors = require(cors)

app.use(cors())
app.use(require("body-parser").json())

var instance = new Razorpay({
  key_id:"rzp_live_xlfQfSGlO230bx",
  key_secret:"n5oV1YRCuuILGY1ymeH0MFO2"
})

app.post('/create/orderId',(req,res)=>{
  console.log("Create order id req", req.body)
})