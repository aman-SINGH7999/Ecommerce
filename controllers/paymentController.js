import orderModel from "../models/orderModel.js";
import braintree from 'braintree'
// var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


const braintreeTokenController = async (req, res)=>{
  // console.log("------------------Payment Token----------------")
  try{
    gateway.clientToken.generate({}, (err,responce)=>{
      if(err){
        res.status(500).send(err);
      }else{
        res.send(responce);
      }
    })
  }catch(err){
    // console.log(err);
  }
}

const brainterrPaymentController = async (req, res)=>{
  // console.log("------------------This is payment function--------------------");
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    // console.log(error);
  }
}



export {braintreeTokenController, brainterrPaymentController}
