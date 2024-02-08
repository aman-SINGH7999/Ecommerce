import React from 'react'
import Layout from '../components/layout/Layout'

export default function About() {
  return (
    <Layout title={"about-ecommerce"}>
        <div className='row display-flex flex-row'>
            <div className='col-sm-6 display-flex my-5'>
                <img className='local-img' src="/images/g11.jpg" alt="img" />
            </div>
            <div className='col-sm-4 display-flex'>
                <h1 className='heading text-center'>AOUT US</h1>
                <div className='px-2'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda harum soluta quae placeat quaerat laboriosam dolorum, sit deserunt ex sapiente obcaecati deleniti totam et, sequi accusantium maxime molestiae quisquam! Placeat!
                    </p>
                </div>
            </div>
        </div>
    </Layout>
  )
}
