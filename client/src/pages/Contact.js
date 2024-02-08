import React from 'react'
import Layout from '../components/layout/Layout'
import { IoMdMailUnread } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { TfiHeadphoneAlt } from "react-icons/tfi";


export default function Contact() {
  return (
    <Layout title={"contact-ecommerce"}>
        <div className='row display-flex flex-row'>
            <div className='col-sm-6 display-flex my-5'>
                <img className='local-img' src="/images/g11.jpg" alt="img" />
            </div>
            <div className='col-sm-4 display-flex'>
                <h1 className='heading text-center'>CONTACT US</h1>
                <div className='px-2'>
                    <p>any query and info about prodduct feel free to call any time we 24x7 availible</p>
                    <p><IoMdMailUnread /> www.help@ecommerceapp.com</p>
                    <p><FaPhone /> 012-3456-789</p>
                    <p><TfiHeadphoneAlt /> 1800-0000-0012(toll free)</p>
                </div>
            </div>
        </div>
    </Layout>
  )
}
