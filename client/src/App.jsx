import React, { useContext } from "react";
import Auth from "./pages/Auth";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import PlayerContextProvider from "./context/PlayerContext";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="h-screen w-screen ">
      <Routes>
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />}
        />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute
              children={
                <PlayerContextProvider>
                  <Dashboard />
                </PlayerContextProvider>
              }
            />
          }
        />
        <Route
          path="/playlist"
          element={<ProtectedRoute children={<p> hello </p>} />}
        ></Route>
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </div>
  );
};

export default App;
