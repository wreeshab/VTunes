import React from "react";
import Auth from "./pages/Auth";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="h-screen w-screen ">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>

    </div>
  );
};

export default App;
