import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArtistAuthContext } from "../context/ArtistAuthContext";

const ArtistLogin = ({ setCurrState }) => {
  const { artistLogin } = useContext(ArtistAuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState({
    success: false,
    message: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/artist-auth/login",
        formData
      );
      console.log(response.data.message);

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/artist-home");

        artistLogin({ token });
      }
      setResponse({
        success: true,
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
      setResponse({
        success: false,
        message: error.response.data.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1 className="text-5xl font-bold text-center text-white mb-4">
        D - Tunes Artist
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-black  mb-4">
          Login to DTunes
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
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
            Login
          </button>
        </form>
        <hr className="w-full h-0.5 bg-blue-300 my-4" />
        <button
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
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setCurrState("register")}
          >
            Click Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default ArtistLogin;
