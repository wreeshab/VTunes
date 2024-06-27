import React from "react";
import Auth from "./pages/Auth";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>

    </div>
  );
};

export default App;
