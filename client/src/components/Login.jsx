import React, { useState } from 'react';
import axios from 'axios';
import '../assets/deltaLogoGreen.png';
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrState }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [response, setResponse] = useState({
        success: false,
        message: '',
    });


    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            console.log(response.data.message);
            if (response.data.success) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/dashboard');
            }
            setResponse({
                success: true,
                message: response.data.message,
            });
            // Handle login success (e.g., redirect)
        } catch (error) {
            console.error(error.response.data);
            // alert(error.response.data.message)
            setResponse({
                success: false,
                message: error.response.data.message,
            });
            // Handle login error (e.g., show error message)
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
            <h1 className="text-5xl font-bold text-center text-white mb-4">D - Tunes</h1>
            <div className="  bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Login to DTunes</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">E-mail</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                            required
                            placeholder='Enter your email'
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                            required
                            placeholder='Enter your password'
                        />
                    </div>
                    {<p className="text-red-500 text-center">{response.message} </p>}
                    <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition duration-300">Login</button>
                </form>
                <hr className="w-full bg-blue-300 my-4" />
                <button type="" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition duration-300 flex items-center justify-center gap-3">
                    <span>Login with</span> <img className="w-7 h-7" src="" alt="delta" />
                </button>
                <p className="text-center text-gray-600 mt-4">Don't have an account? <span className="text-purple-600 cursor-pointer" onClick={() => setCurrState('signup')}>Sign up</span></p>
            </div>
        </div>
    );
};

export default Login;
