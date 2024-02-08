import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { HiShoppingBag } from "react-icons/hi";
import { useAuth } from '../../context/auth';
import {toast} from 'react-toastify'
import SearchInput from '../SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd'

export default function Header() {
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const categories = useCategory();
    const [cart, setCart] = useCart();

    const handleLogout = ()=>{
        setAuth({
            ...auth,
            user:null,
            token:""
        })
        localStorage.removeItem('auth');
        toast.success("Logged Out Successfully.")
        navigate('/login');
    }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link to="#" className="navbar-brand" ><HiShoppingBag  className='brand-logo'/>Ecommerce</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className='mobile'>
            <SearchInput/>
            </div>
            <div className='d-flex flex-row'>

            <div className='pc'>
            <SearchInput/>
            </div>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item dropdown">
                <NavLink to="/category" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* <li><NavLink className="dropdown-item" to={`/category`}>All Categories</NavLink></li> */}
                    {
                        categories?.map((category)=>{
                            return <li key={category._id} ><NavLink className="dropdown-item" to={`/category/${category.slug}`}>{category.name}</NavLink></li>
                        })
                    }
                </ul>
                </li>
                {
                    !auth.user
                    ? <>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>
                     </>
                    :<>
                        <li className="nav-item dropdown">
                            <NavLink to="/category" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {auth?.user?.name}
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <NavLink className="dropdown-item" to={`/dashboard/${
                                        auth?.user?.role === 1 ? "admin" : "user"
                                    }`}>Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} to="/logout" className="dropdown-item">Logout</button>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Badge count= {cart?.length} showZero>
                                <NavLink to="/cart" className="nav-link">Cart</NavLink>
                            </Badge>
                        </li>
                    </>
                }
            </ul>
            </div>
            </div>
        </div>
    </nav>
    </>
  )
}
