import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Authstyles.css'
import { useAuth } from '../../Context/Auth';


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }
    return (
        <Layout title="Register - Ecommerce App">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h3 className='title'>Login</h3>
                    <div className="mb-3">
                        <input type="email" className="form-control" value={email} placeholder='Email Address' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" value={password} id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    </div>
                    <div className="mb-3">
                        <button type="button" onClick={() => { navigate('/forgot-password') }} className="btn btn-primary">Forgot Password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login