import React from 'react'
import { useSearch } from '../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function SearchInput() {
    const [values, setValues] = useSearch();  
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product//search-product/${values.keyword}`);
            setValues({...values, results: data});
            navigate('/search')
        }catch(err){
            console.log(err);
        }
    }

  return (
        <form className="d-flex me-end me-2" onSubmit={handleSubmit} >
        <input 
            className="form-control me-2" 
            type="search" 
            placeholder="Search"
            value={values.keyword}
            onChange={(e)=> setValues({...values, keyword: e.target.value})} 
        />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
  )
}
