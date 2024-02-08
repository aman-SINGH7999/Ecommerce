import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async ()=>{
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
      setCategories(data?.allCategory);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getCategories();
  },[])

  return  categories;
}
