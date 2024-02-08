import React, {useState, useEffect} from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(()=>{
        const authCheck = async ()=>{
            const responce = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
            if(responce.data.ok){
                setOk(true)
            }else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck();
    },[])

    // outlet used for enabling nested route
  return ok ? <Outlet/> : <Spinner/> 
}
