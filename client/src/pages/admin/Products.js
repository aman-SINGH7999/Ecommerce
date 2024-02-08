import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);

    const getAllProduct = async ()=>{
        try{
            const responce = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/getall-products`);
            if(responce?.data?.success){
                setProducts(responce.data.allProducts);
            }else{
                toast.error(responce.data.message);
            }
        }catch(err){
            toast.error("Somethong Went Wrong");
        }
    }

    useEffect(()=>{
        getAllProduct();
    },[])

    return (
        <Layout>
            <div className="container-flud m-3 p-3">
            <div className="row">
            <div className="col-sm-3">
                <AdminMenu />
            </div>
            <div className="col-sm-9">
                <div className="card w-100 p-3">
                <h3>Name : All Products</h3>
                    <div className="all-products">
                    {
                        products?.map((product,index)=>{
                            return (
                            <Link key={product._id} to={`/dashboard/admin/update-product/${product.slug}`} className='product-link mt-2'>
                                <div className="card mt-1 p-1" style={{width: "18rem"}}>
                                    <img src={product.photo} className="card-img-top" alt="..." />
                                    <hr/>
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">$ {product.price}</p>
                                    </div>
                                </div>
                            </Link>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
            </div>
        </div>
        </Layout>
    )
}
