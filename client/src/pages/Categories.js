import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import Card from '../components/layout/Card';

export default function Categories() {
    const [products, setProducts] = useState([]);
    const [category, setcategory] = useState("");
    const [cart, setCart] = useCart();
    const params = useParams();
    const navigate = useNavigate();
    const [auth , setAuth] = useAuth();
    const getProductsByCategory = async ()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-by-category/${params?.slug}`)
            setProducts(data?.products);
            setcategory(data?.category);
        }catch(err){
            // console.log(err);
        }
    }
    useEffect(()=>{
        getProductsByCategory();
    },[params?.slug]);

  return (
    <Layout title={"All Categories"}>
        <div className='my-4 text-center'>
            <h2>Category - {category?.name}</h2>
            {products.length === 0 ? <h5 className='text-center m-3'>No Product Found</h5> : null}
            <div className="d-flex flex-wrap">
            {
                products?.map((product,index)=>{
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
