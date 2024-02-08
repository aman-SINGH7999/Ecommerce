import React,{useEffect, useState} from 'react'
import Layout from '../components/layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Checkbox, Radio} from 'antd'
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';
import HomeImg from '../images/home-img.avif'
import { useAuth } from '../context/auth';
import Card from '../components/layout/Card';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [auth , setAuth] = useAuth();
  const navigate = useNavigate();


  // Get All Products
  const getAllProducts = async ()=>{
    try{
      setLoading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    }catch(err){
      setLoading(true);
      toast.error("Product Not Feched.")
      setLoading(false);
    }
  }
  useEffect(()=>{
    getAllProducts();
  },[]);

  // Get All Categories
  const getAllCategory = async ()=>{
    try{
      const responce = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
      setCategories(responce.data.allCategory);
    }catch(err){
      toast.error("Categories Not Feched.")
    }
  }
  useEffect(()=>{
    getAllCategory();
  },[]);

  // load more
  const loadMore = async ()=>{
    try{
      setLoading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts([...products,...data?.products]);
    }catch(err){
      setLoading(true)
      toast.error("Product Count Not Feched.")
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(page === 1) return;
    loadMore();
  },[page])

  // Filter By Category
  const handleFilterByCategory = (value, id)=>{
    let all = [...checked];
    if(value){
      all.push(id);
    }else{
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }

  // Count
  const getTotal = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/count-product`);
      // console.log("-----------------------------------",data)
      setTotal(data.total);
    }catch(err){
      toast.error("Product Count Not Feched.")
    }
  }
  useEffect(()=>{
    getTotal();
  },[])

  // GET Filtered Producted
  const getFilteredProduct = async ()=>{
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked, radio});
      if(data.success){
        setProducts(data.products);
      }
    }catch(err){
      toast.error("Error in Filtring Product.")
    }
  }

  useEffect(()=>{
    if(checked.length || radio.length) getFilteredProduct();
  },[checked, radio])

  return (
    <Layout title={"All products - Best offers"}>
      <div>
    <img src={HomeImg} alt="" className='home-img' />
      </div>
        <div className="row mt-3">
          <div className="col-md-2">
            <h5 className="mb ms-2">Filter By Category</h5>
            <div className="d-flex flex-column ms-3">
            {
              categories?.map((category=>{
                return (
                  <Checkbox key={category._id} onChange={(e)=> handleFilterByCategory(e.target.checked, category._id)} >
                    {category.name}
                  </Checkbox>
                )
              }))
            }
            </div>
            <h5 className="mt-3 ms-2">Filter By Price</h5>
            <div className="d-flex flex-column ms-3">
              <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
                {
                  Prices?.map((price)=>{
                    return (
                      <div key={price._id}><Radio value={price.array}>{price.name}</Radio></div>
                    )
                  })
                }
              </Radio.Group>
            </div>
            <button className='btn mt-3 ms-2' onClick={()=> window.location.reload()}>RESRET FILTERS</button>
          </div>
          <div className="col-md-9">
          {/* {JSON.stringify(radio,null,4)} */}
            <h2 className="text-center">All Products</h2>
            <div className="d-flex flex-wrap">
            {
                products?.map((product,index)=>{
                    return (
                      <Card product={product} />
                    )
                })
            }
            </div>

            <div className="m-2 p-3">
              { products && products?.length < total && (
                <button className='btn' 
                onClick={(e)=>{
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  { loading ? "Loading..." : "Loadmore"}
                </button> 
              )}
            </div>
          </div>
        </div>
    </Layout>
  )
}
