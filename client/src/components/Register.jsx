import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import loginWithDeltaClient from "../helpers/deltaAuth";

const Register = ({ setCurrState }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [response, setResponse] = useState({
    success: false,
    message: "",
  });
  const { login } = useContext(AuthContext);
  const { setUser } = useContext(AuthContext);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      if (response.data.success) {
        const token = response.data.token;
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", token);
        navigate("/dashboard");

        login({ token });
      }
      setResponse({
        success: true,
        message: response.data.message,
      });
      // Handle registration success (e.g., redirect, show success message)
    } catch (error) {
      // console.error(error.response.data);
      setResponse({
        success: false,
        message: error.response.data.message,
      });
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
      <h1 className="text-5xl font-bold text-center text-white mb-4">
        D - Tunes
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">
          Register for DTunes
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
              required
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
              required
              placeholder="Enter your password"
            />
          </div>
          {<p className="text-red-500 text-center"> {response.message} </p>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <hr className="w-full h-0.5  bg-blue-300 my-4" />
        <button
          onClick={() => loginWithDeltaClient()}
          type=""
          className="w-full bg-blue-900 text-white p-3 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-3"
        >
          <span>Login with</span>{" "}
          <img
            className="w-7 h-7"
            src="./images/deltaLogoGreen.png"
            alt="delta"
          />
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setCurrState("login")}
          >
            Click Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
