import React, {useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment'
import { toast } from 'react-toastify';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      toast.error("something went wrong!")
      // console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
   
  return (
    <Layout title={"orders - ecommerce"}>
         <div className="contener-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <UserMenu />
          </div>
          <div className="col-sm-9">
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
                                  <td>{o?.status}</td>
                                  <td>{auth?.user?.name}</td>
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
    </Layout>
  )
}
