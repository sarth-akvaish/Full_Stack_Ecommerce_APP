import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Authstyles.css'

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [question, setQuestion] = useState('')
  const navigate = useNavigate();
  // form function 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, question });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }
  }
  // console.log(process.env.REACT_APP_API);

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3 className='title'>Register Form</h3>
          <div className="mb-3">
            <input type="text" value={name} placeholder='Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" value={email} placeholder='Email Address' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" value={password} id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
          </div>
          <div className="mb-3">
            <input placeholder='Phone' type="text" className="form-control" value={phone} id="exampleInputPassword1" onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="text" placeholder='Address' value={address} className="form-control" id="exampleInputPassword1" onChange={(e) => setAddress(e.target.value)} required />
          </div>
          <div className="mb-3">
            <input type="text" placeholder='Who is your Best friend ?' value={question} className="form-control" id="exampleInputPassword1" onChange={(e) => setQuestion(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary">Register</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register