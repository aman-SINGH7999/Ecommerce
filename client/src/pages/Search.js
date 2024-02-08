import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

  return (
    <Layout title={"search - ecommerce"}>
        <div className='container'>
            <div className="text-center">
                <h2>Search Result</h2>
                <h6>{values?.results.lenght < 1 ? 'No Products Found' : `Found ${values?.results?.length}`}</h6>
                <div className="d-flex flex-wrap mt-4">
                {
                    values?.results?.map((product,index)=>{
                        return (
                        // <Link key={product._id} to={`/dashboard/admin/update-product/${product.slug}`} className='product-link m-2'>
                            <div key={product._id} className="card mt-3 p-1 m-auto" style={{width: "18rem"}}>
                                <img src={product.photo} className="card-img-top" alt="..." />
                                <hr/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description.substring(0,30)}...</p>
                                    <h6 className="card-text">RS. {product.price}/-</h6>
                                    <button className='btn-second btn-primary ms-3' onClick={()=>navigate(`/product/${product.slug}`)}>More Details</button>
                                    <button className='btn-second btn-secondary' onClick={()=>navigate(`/cart`)}>Add To Cart</button>
                                </div>
                            </div>
                        // </Link>
                        )
                    })
                }
                </div>
            </div>
        </div>
    </Layout>
  )
}
