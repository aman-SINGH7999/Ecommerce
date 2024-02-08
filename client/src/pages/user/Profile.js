import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'

export default function Profile() {
    const [auth] = useAuth();
  return (
    <Layout title={"user-profile - ecommerce"}>
        <div className="contener-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <UserMenu />
          </div>
          <div className="col-sm-9">
            <div className="card w-75 p-3">
            <h1>Your Profile</h1>
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
