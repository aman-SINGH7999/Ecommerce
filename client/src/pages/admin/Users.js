import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Users() {
    const [auth] = useAuth();
    const [allUsers, setAllUsers] = useState([]);

    const getAllUsers = async ()=>{
      try{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-users`);
        setAllUsers(data);
        // console.log(data);
      }catch(err){
        toast.error("Something Went Wrong");
      }
    }
    useEffect(()=>{
      getAllUsers();
    },[])

  return (
    <Layout title={"users - ecommerce"}>
      <div className="container-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <AdminMenu />
          </div>
          <div className="col-sm-9">
            <div className="card w-75 p-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Contact</th>
                </tr>
              </thead>
              <tbody>
                {
                  allUsers?.map((user,index)=>{
                    return (
                      <>
                        <tr key={user._id}>
                          <th scope="row">{index+1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
