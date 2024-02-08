import React, {useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';
import Card from '../components/layout/Card';
import { useAuth } from '../context/auth';

export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const params = useParams();
    const [reletedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [auth] = useAuth();


    const getProduct = async ()=>{
        // console.log("====++++++++++++++=")
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            // console.log("========================",data)
            setProduct(data?.product);
            getRelatedProduct(data?.product?._id, data?.product?.category?._id);
        }catch(err){
            // console.log(err);
        }
    }

    const getRelatedProduct = async (pid, cid)=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        }catch(err){
            // console.log(err);
        }
    }

    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])

  return (
    <Layout>
    <div className="row container mt-3">
        <div className="col-md-6 card p-2">
        <img src={product?.photo} className="product-image" alt="..." />
        </div>
        <div className="col-md-6 mt-4">
            <h2>Product Details</h2>
            <h6>Name : {product?.name}</h6>
            <h6>Description : {product?.description}</h6>
            <h6>Price : $ {product?.price}</h6>
            <h6>Category : {product?.category?.name}</h6>

            {
                auth.user 
                ? <button className='btn-second btn-secondary' onClick={()=> {
                setCart([...cart, product]);
                localStorage.setItem('cart', JSON.stringify([...cart, product]));
                toast.success("Product added to Cart")
                // navigate(`/cart`)
                }}>Add To Cart</button>
                : 
                <button className='btn-second btn-secondary' 
                    onClick={()=> {
                    navigate(`/login`)
                }}>Add To Cart</button>
            }
        </div>
    </div>
    <hr />
    <hr />
    <div className="row">
        {   
            reletedProducts.length === 0 
            ? <h5 className='text-center m-auto mb-4'>No Similler Products Found</h5> 
            : <h2 className='text-center'>Similer Products</h2>
        }
        <div className="d-flex flex-wrap">
            {
                reletedProducts?.map((product,index)=>{
                    return (
                        <Card product={product} />
                    )
                })
            }
            </div>
    </div>
    </Layout>
  )
}
