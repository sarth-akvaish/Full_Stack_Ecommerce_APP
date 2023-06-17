import Layout from '../../components/Layout/Layout'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Authstyles.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [question, setQuestion] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newpassword, question });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }


    return (
        <Layout title={'forgot-password'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h3 className='title'>RESET PASSWORD</h3>
                    <div className="mb-3">
                        <input type="email" className="form-control" value={email} placeholder='Email Address' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={question} placeholder='Who is your best friend ?' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setQuestion(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" value={newpassword} id="exampleInputPassword1" onChange={(e) => setNewpassword(e.target.value)} placeholder='Password' required />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword