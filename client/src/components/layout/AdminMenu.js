import React from 'react'
import {NavLink} from 'react-router-dom'

export default function AdminMenu() {
  return (
    <>
      <div className="text-center">
        <h2>Admin Panal</h2>
        <div className="list-group">
          <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
          <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
          <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
          <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
        </div>
      </div>
    </>
  )
}
