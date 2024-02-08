import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom';
const {Option} = Select;



export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(null);
  const [shipping, setShipping] = useState(false);

  const navigate = useNavigate();

  const getAllCategory = async ()=>{
    try{
      const responce = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
    // console.log(responce.data.allCategory);
    setCategories(responce?.data?.allCategory);
    }catch(err){
      toast.error("Something Went Wrong")
    }
  }

  useEffect(()=>{
    getAllCategory();
  },[]);

  // Cloudenery 
  const submitImage = async (img)=>{
    try{
      setLoading("/images/download.png");
      const data = new FormData()
      data.append("file",img)
      data.append("upload_preset","Ecommerce")
      data.append("cloud_name","amansing47")
      const imgUrl = await fetch("https://api.cloudinary.com/v1_1/amansing47/image/upload",{
        method:"post",
        body : data,
      })
      // console.log("img : ", imgUrl)
      const data1 = await imgUrl.json();
      // console.log("img-url : ", data1.url);
      setPhoto(data1.url);
      setLoading(data1.url);
    }catch(err){
      toast.error("Error in Uploading Image");
    }
  }

  // Submit Form
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      // console.log("name = ", name)
      // console.log("description = ", description)
      // console.log("price = ", price)
      // console.log("category = ", category)
      // console.log("quantity = ", quantity)
      // console.log("photo = ", photo)
      // console.log("shipping = ", shipping)
      const responce = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,{
        name,
        description,
        price,
        category,
        quantity,
        photo,
        shipping,
      })

      if(responce?.data?.success){
        toast.success(responce.data.message);
        navigate('/dashboard/admin/products');
      }else{
        toast.error(responce.data.message);
      }

    }catch(err){
      toast.error("Something Went Wrong.")
    }
  }

   return (
    <Layout title={"CreateProduct - ecommerce"}>
      <div className="container-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <AdminMenu />
          </div>
          <div className="col-sm-9">
            <div className="card w-75 p-3">
              <h3>Create Products</h3>
              <form action="" onSubmit={handleSubmit}>
                <Select 
                  bordered={false} 
                  placeholder="Select a Category" 
                  size='large' 
                  showSearch
                  className='form-select mb-3'
                  onChange={(value)=>{setCategory(value)}}
                >
                  {
                    categories?.map(c=>{
                      return  <Option key={c._id} value={c._id}> {c.name} </Option>
                    })
                  }
                </Select>
                <div className='mb-3'>
                  <input 
                    type="file" 
                    name='photo' 
                    accept='image/*' 
                    onChange={(e)=>{submitImage(e.target.files[0])}} 
                    className='form-control w-100'/>
                  <div className='text-center'>
                    { loading === null ? null : <img src={loading} alt='Product_Image' className='w-75 mt-2' /> }
                  </div>
                </div>
                <div className="mb-3">
                  <input type="text" 
                    className="form-control w-100" 
                    id="name" 
                    placeholder='Enter Name' 
                    value={name} 
                    onChange={(e)=>{setName(e.target.value)}} 
                  />
                </div>
                <div className="mb-3">
                  <textarea name="description" rows="3"
                    id="description" 
                    className="form-control w-100"
                    placeholder='Enter Description' 
                    value={description} 
                    onChange={(e)=>{setDescription(e.target.value)}}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input type="number" 
                    className="form-control w-100" 
                    id="price" 
                    placeholder='Enter Price' 
                    value={price} 
                    onChange={(e)=>{setPrice(e.target.value)}} 
                  />
                </div>
                <div className="mb-3">
                  <input type="text" 
                    className="form-control w-100" 
                    id="description" 
                    placeholder='Enter Quantity' 
                    value={quantity} 
                    onChange={(e)=>{setQuantity(e.target.value)}} 
                  />
                </div>
                <Select 
                  bordered={false} 
                  placeholder="Select a Shipping" 
                  size='large' 
                  showSearch
                  className='form-select mb-3'
                  onChange={(value)=>{setShipping(value)}}
                >
                  <Option value="0"> No </Option>
                  <Option value="1"> Yes </Option>
                </Select>
                <button type='submit' className='btn'>CREATE PRODUCT</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
