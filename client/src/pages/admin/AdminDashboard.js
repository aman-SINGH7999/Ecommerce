import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'

export default function AdminDashboard() {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"admin-dashboard ecommerce"}>
      <div className="container-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <AdminMenu />
          </div>
          <div className="col-sm-9">
            <div className="card w-75 p-3">
              <h3>Name : {auth?.user?.name}</h3>
              <h3>Email : {auth?.user?.email}</h3>
              <h3>Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
