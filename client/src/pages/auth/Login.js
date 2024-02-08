import React, {useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useAuth } from '../../context/auth'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [auth,setAuth] = useAuth();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            // console.log(body);
            const responce = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {email, password});
            if(responce.data.success){
                toast.success(`${responce.data.message}`);
                setAuth({
                    ...auth,
                    user:responce.data.user,
                    token:responce.data.token
                })
                localStorage.setItem('auth',JSON.stringify(responce.data));
                navigate(location.state || '/');
            }else{
                toast.error(`${responce.data.message}`)
            }
        }catch(err){
            // console.log(err);
            toast.error("Something Went Wrong.")
        }
    }


  return (
    <Layout title={"login - ecommerce app"}>
        <div className="register">
            <div className="myform">
            <h2 className='mb-3'>LOGIN FORM</h2>
            <form className='' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder='Email' 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">LOGIN</button>
                <button type="button" className="btn mt-3" onClick={()=> {navigate('/forgotpassword')}} >FORGOT PASSWORD</button>
            </form>
            </div>
        </div>
    </Layout>
  )
}
