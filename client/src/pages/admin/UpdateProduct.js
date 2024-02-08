import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import {Select} from 'antd'
import {useNavigate, useParams} from 'react-router-dom'
const {Option} = Select;


export default function UpdateProduct() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [shipping, setShipping] = useState(false);
    const [id,setId] = useState("");
    const params = useParams()

    const navigate = useNavigate();

    const getSingleProduct = async ()=>{
        // console.log("---------------------------",params.slug)
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            if(data?.success){
              // console.log(data.product);
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
                setQuantity(data.product.quantity);
                setId(data.product._id);
                setPhoto(data.product.photo);
                setCategory(data.product?.category);
                setShipping(data?.product?.shipping);
            }else{
                toast.error(data.message);
            }
        }catch(err){
            toast.error("Something Went Wrong")
        }
    }
    useEffect(()=>{
        getSingleProduct();
    },[])

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
          // setLoading(true);
          setPhoto("/images/download.png")
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
          // setLoading(false);
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
          const responce = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,{
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

// Delete Product
  const handleDelete = async ()=>{
    try{
      const answer = window.prompt("Are You Sure Want to Delete This Product?");
      if(!answer) return;
      const responce = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
      if(responce?.data?.success){
        toast.success(`${name} is Deleted Successfully.`)
        navigate('/dashboard/admin/products');
      }
    }catch(err){
      toast.error("Some Problem in Deleting Item.")
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
              <h3>{name}</h3>
              <form action="" onSubmit={handleSubmit}>
                <Select 
                  bordered={false} 
                  placeholder="Select a Category" 
                  size='large' 
                  showSearch
                  className='form-select mb-3'
                  onChange={(value)=>{setCategory(value)}}
                  value={category.name}
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
                  <img src={photo} alt='Product_Image' className='w-75 mt-2' />
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
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0"> No </Option>
                  <Option value="1"> Yes </Option>
                </Select>
                <button type='submit' className='btn'>UPDATE PRODUCT</button>
              </form>
              <hr/>
              <button type='button' className='btn-second btn-danger mt-2' onClick={ handleDelete }>DELETE PRODUCT</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
