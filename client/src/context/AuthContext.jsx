import React, { Children, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ Children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //other api logic goes here
      setIsAuthenticated(true);
      setUser({ token });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //     if (isAuthenticated) {
  //         navigate('/dashboard');
  //     } else {
  //         navigate('/auth');
  //     }
  // }, [isAuthenticated, navigate]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login,loading }}>
      {Children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
