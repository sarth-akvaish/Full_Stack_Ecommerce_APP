import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi'
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus">
        <div className="col-md-6 m-5">
          <img src="/images/contactus.jpeg" alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4 mt-5">
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            Any query, Feel free to contact us anytime 24X7
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.ptanhiaajkal.com
          </p>
          <p className='mt-3'>
            <BiPhoneCall /> : 012-29783748
          </p>
          <p className='mt-3'>
            <BiSupport /> : 1800 - 0000- 000 (Toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
