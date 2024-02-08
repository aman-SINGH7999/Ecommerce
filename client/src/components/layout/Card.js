import React from 'react'
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';

export default function Card({product}) {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();

  return (
    <div key={product._id} className="card mt-3 p-1 m-auto" style={{width: "18rem"}}>
        <img src={product.photo} className="card-img-top" alt="..." />
        <hr/>
        <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description.substring(0,30)}...</p>
            <h6 className="card-text">$ {product.price}</h6>
            <button className='btn-second btn-primary ms-3' onClick={()=>navigate(`/product/${product.slug}`)}>More Details</button>
            {
                auth.user 
                ? <button className='btn-second btn-secondary' onClick={()=> {
                setCart([...cart, product]);
                localStorage.setItem('cart', JSON.stringify([...cart, product]));
                toast.success("Product added to Cart")
                // navigate(`/cart`)
                }}>Add To Cart</button>
                : null
            }
        </div>
    </div>
  )
}
