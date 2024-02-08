import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom' 

export default function PageNotFound() {
  return (
    <Layout>
        <div className='pnf display-flex'>
            <h1 className='pnf-title'>404</h1>
            <h2 className='pnf-heading'>Oops! PageNot Found</h2>
            <Link to="/" className='pnf-btn'> Go Home</Link>
        </div>
    </Layout>
  )
}
