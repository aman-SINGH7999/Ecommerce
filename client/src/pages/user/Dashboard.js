import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'

export default function Dashboard() {
  return (
    <Layout title={"dashoard - ecommerce app"}>
      <div className="contener-flud m-3 p-3">
        <div className="row">
          <div className="col-sm-3">
            <UserMenu />
          </div>
          <div className="col-sm-9">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}
