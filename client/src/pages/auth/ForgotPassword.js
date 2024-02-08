import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import {toast} from 'react-toastify'

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(newPassword !== newPassword2){
            toast.error("Password Are Not Equal.")
        }else{
            try{
                // console.log(body);
                const responce = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgotpassword`, {email, question, newPassword});
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
    <Layout title={"forgot password - ecommerce app"}>
        <div className="register">
            <div className="myform">
            <h2 className='mb-3'>RESET PASSWORD</h2>
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
                        type="text" 
                        className="form-control" 
                        id="question" 
                        placeholder='Enter Your Secret Answer' 
                        value={question} 
                        onChange={(e)=>setQuestion(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="newPassword" 
                        placeholder='Password' 
                        value={newPassword} 
                        onChange={(e)=>setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="newPassword2" 
                        placeholder='Password' 
                        value={newPassword2} 
                        onChange={(e)=>setNewPassword2(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn">SUBMIT</button>
            </form>
            </div>
        </div>
    </Layout>
  )
}
