import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import {toast} from 'react-toastify'


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    // form submit
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(password !== password2){
            toast.error("Password are not match!")
        }else{
            try{
                // console.log(body);
                const responce = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name, email, password, phone, address, question});
                if(responce.data.success){
                    toast.success(`${responce.data.message}`);
                    navigate('/login');
                }else{
                    toast.error(`${responce.data.message}`)
                }
            }catch(err){
                // console.log(err);
                toast.error("Something Went Wrong.")
            }
        }
    }

  return (
    <Layout title={"register - ecommerce app"}>
        <div className="register">
            <div className="myform">
            <h2 className='mb-3'>REGISTER FORM</h2>
            <form className='' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder='Enter Your Name' 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        required
                    />
                </div>
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
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password2" 
                        placeholder='Confirm Password' 
                        value={password2} 
                        onChange={(e)=>setPassword2(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phone" placeholder='Phone' 
                        value={phone} 
                        onChange={(e)=>setPhone(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address" 
                        placeholder='Address' 
                        value={address} 
                        onChange={(e)=>setAddress(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="question" 
                        placeholder='What is your favorite sports?' 
                        value={question} 
                        onChange={(e)=>setQuestion(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">REGISTER</button>
            </form>
            </div>
        </div>
    </Layout>
  )
}
