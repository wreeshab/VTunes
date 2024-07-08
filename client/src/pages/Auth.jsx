import React, { useState, useEffect, useContext } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Auth = () => {
  const [currState, setCurrState] = useState("register");
  const { setUser } = useContext(AuthContext);

  const { login } = useContext(AuthContext);
  const [response, setResponse] = useState({ success: false, message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = async (event) => {
      console.log("Received message:", event.data);
      console.log("handleMessage");
      console.log("event", event);
      if (event.origin !== "http://localhost:5000") return;

      const { code } = event.data;
      console.log("code", code);
      if (code) {
        console.log("code", code);
        try {
          const response = await axios.get(
            "http://localhost:5000/api/auth/delta",
            {
              params: { code },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            const token = response.data.token;
            localStorage.setItem("token", token);
            login({ token });
            navigate("/dashboard");
          }
          setResponse({ success: true, message: response.data.message });
          toast.success(response.data.message, { autoClose: 800 });
        } catch (error) {
          console.error(error.response.data);
          setResponse({ success: false, message: error.response.data.message });
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div className="">
      {currState === "login" ? (
        <Login setCurrState={setCurrState} />
      ) : (
        <Register setCurrState={setCurrState} />
      )}
    </div>
  );
};

export default Auth;
