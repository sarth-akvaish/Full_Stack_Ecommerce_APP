import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={"About us - ecommerce"}>
      <div className="row aboutus"> 
        <div className="col-md-6 ">
          <img src="/images/about.jpeg" alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4 mt-5">
          <p className='m-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut, adipisci? Repellendus molestias vel aspernatur temporibus, blanditiis explicabo! Distinctio corrupti fugit eligendi? Repellendus, vitae soluta delectus voluptatibus accusamus obcaecati rerum quo cum explicabo quidem nostrum.</p>
        </div>
      </div>
    </Layout>
  )
}

export default About