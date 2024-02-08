import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';
import { toast } from 'react-toastify';
const { Option } = Select;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "Deliverd", "Cancle"]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useAuth();
  

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      // console.log("=======================",data)
      setOrders(data);
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);


  const handleChange = async (orderId,value)=>{
    try{
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-orders/${orderId}`, {status : value});
        getOrders();
    }catch(err){
      toast.error("Something went wrong!");
        // console.log(err);
    }
  }

  return (
    <Layout title={"All orders data"}>
      <div className="container-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <AdminMenu />
          </div>
          <div className="col-sm-9">
            <div className="card w-75 p-3">
                <h1 className='text-center'>All Orders</h1>
                {
                    orders?.map((o,i)=>{
                    return (
                        <div className="border shadow">
                        <table className='table'>
                            <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Buyer</th>
                                <th scope='col'>Orders</th>
                                <th scope='col'>Payment</th>
                                <th scope='col'>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{i+1}</td>
                                <td>
                                    <Select bordered={false} onChange={(value)=>handleChange(o._id, value)} defaultValue={o?.status}>
                                        {
                                            status?.map((s,i)=>{
                                                return (
                                                    <Option key={i} value={s}>{s}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </td>
                                <td>{o?.buyer?.name}</td>
                                <td>{moment(o?.createAt).fromNow()}</td>
                                <td>{o?.payment?.success ? "Success" : "failed"}</td>
                                <td>{o?.products?.length}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="container">
                        {
                            o?.products?.map(p =>(
                            <div className="row m-2 card flex-row p-2">
                                <div className="col-md-4">
                                <img src={p?.photo} className="card-img-top" style={{width:"100px", height:"100px"}} alt="..." />
                                </div>
                                <div className="col-md-8">
                                <h5 className="card-title">{p?.name}</h5>
                                <p className="card-text">{p?.description.substring(0,30)}...</p>
                                <h6 className="card-text">$. {p?.price}/-</h6>
                                </div>
                            </div>
                            ))
                        }
                        </div>
                        </div>
                    )
                    })
                }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
