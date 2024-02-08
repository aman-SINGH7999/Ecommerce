import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import DropIn from "braintree-web-drop-in-react";


export default function CartPage() {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [show, setShow] = useState(false);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(auth?.user?.address);
  const navigate = useNavigate();



  const totalPrice = ()=>{
    try{
      let total = 0;
      cart?.map(item => (total = total + item.price));
      return total.toLocaleString("en-IN",{
        style:"currency",
        currency:"INR"
      });
    }catch(err){
      // console.log(err);
    }
  }

  const removeCartItem = (pid)=>{
    try{
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart); 
      localStorage.setItem('cart', JSON.stringify(myCart));
    }catch(err){
      // console.log(err)
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      // console.log("============",auth)
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-address/${auth.user._id}`, {address});
      if(data?.success){
        setAuth({...auth, user: data.user});
        toast.success(data.message)
      }else{
        toast.error(data.message);
      }
    }catch(err){
      // console.log(err);
    }
    setShow(false);
  }

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/payment/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/payment/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart - ecommerce"}>
      <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1 className="text-center bg-light p-2 mb-1">
                    {`Hello ${auth?.token && auth?.user?.name}`}
                </h1>
                <h4 className="text-center">
                    {cart?.length  
                    ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "Please Login to Checkout"}` 
                    : "Your Cart is Empty"}
                </h4>
            </div>
            <h2>Your Cart</h2>
        </div>
        <div className="row">
          <div className="col-md-9">
            {
              cart?.map(p =>(
                <div className="row m-2 card flex-row p-2">
                  <div className="col-md-4">
                    <img src={p?.photo} className="card-img-top" style={{width:"100px", height:"100px"}} alt="..." />
                  </div>
                  <div className="col-md-8">
                    <h5 className="card-title">{p?.name}</h5>
                    <p className="card-text">{p?.description.substring(0,30)}...</p>
                    <h6 className="card-text">$ {p?.price}</h6>
                    <button className='btn-second btn-danger' onClick={()=>removeCartItem(p?._id)}>Remove</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="col-md-3">
            <h3>Cart Summary</h3>
            <p>Total | CheckOut | Payment</p>
            <hr />
            <h4>Total : $ {totalPrice()}</h4>
            <p><b>Current Address :</b> {auth?.user?.address}</p>
            <button className='btn-second btn-outline-warning btn-sm' onClick={()=>setShow(true)}>Update Address</button>
            {
              show ? 
              <form className='mt-2' onSubmit={handleSubmit}>
                <textarea className='form-control' name="" id="" rows="3" value={address} onChange={(e)=> setAddress(e.target.value)}></textarea>
                <button className='btn-second btn-success btn-sm mt-1' type='submit'>Save</button>
                <button className='btn-second btn-danger btn-sm mt-1' onClick={()=> setShow(false) }>Cancle</button>
              </form>
              : null
            }
            <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
