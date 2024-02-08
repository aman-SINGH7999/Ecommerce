import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'antd';

export default function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");



    const getAllCategory = async ()=>{
      try{
        const responce = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/getall-category`);
      // console.log(responce.data.allCategory);
      setCategories(responce.data.allCategory);
      }catch(err){
        toast.error("Something Went Wrong");
      }
    }

    useEffect(()=>{
      getAllCategory();
    },[]);

  // handle form  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
        const responce = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name : newCategory});
        if(responce?.data?.success){
          getAllCategory();
          toast.success(`${responce.data.name} is Created`);
        }else{
          toast.error(responce.data.message);
        }
      }catch(err){
        toast.error("Something Went Wrong");
      }
    }
  // handle Update
  const handleUpdate = async (e)=>{
    e.preventDefault();
      try{
        const responce = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name : updatedName});
        if(responce?.data?.success){
          toast.success(`Category Updated Successfully.`);
          setSelected(null);
          setUpdatedName("");
          setVisible(false);
          getAllCategory();
        }else{
          toast.error(responce.data.message);
        }
      }catch(err){
        toast.error("Something Went Wrong");
      }
  }

  // handle delete
  const handleDelete = async (id)=>{
    try{
      // toast.warning(id)
      const responce = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`);
      if(responce?.data?.success){
        toast.success(`Category Deleted Successfully.`);
        getAllCategory();
      }else{
        toast.error(responce.data.message);
      }
    }catch(err){
      toast.error("Something Went Wrong");
    }
  }

  return (
    <Layout title={"CreateCategory - ecommerce"}>
        <div className="container-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <AdminMenu />
          </div>
          <div className="col-sm-9">
            <div className="card w-75 p-3">
              <h3>Manage Category</h3>
              
              <form className='my-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input type="text" 
                    className="form-control" 
                    id="category" 
                    placeholder='Enter New Category' 
                    value={newCategory} 
                    onChange={(e)=>{setNewCategory(e.target.value)}} 
                  />
                </div>
                <button type="submit" className="btn" style={{width:"100px"}}>Submit</button>
              </form>

              <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories?.map((category,index)=>{
                    return (
                      <>
                        <tr key={category._id}>
                          <th scope="row">{index}</th>
                          <td>{category.name}</td>
                          <td>
                            <button className='btn-second btn-warning' 
                              onClick={()=>{
                                setVisible(true); 
                                setUpdatedName(category.name);
                                setSelected(category);
                              }}
                            >Edit</button>
                            <button className='btn-second btn-danger' onClick={()=>{handleDelete(category._id)}}>Delete</button>
                          </td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </table>
            </div>
            <Modal onCancel={()=>{setVisible(false)}} footer={null} open={visible}>
            <form className='my-3' onSubmit={handleUpdate}>
                <div className="mb-3">
                  <input type="text" 
                    className="form-control" 
                    id="category" 
                    placeholder='Enter New Category' 
                    value={updatedName} 
                    onChange={(e)=>{setUpdatedName(e.target.value)}} 
                  />
                </div>
                <button type="submit" className="btn" style={{width:"100px"}}>Submit</button>
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}
