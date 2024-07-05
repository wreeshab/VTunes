import React, { useContext } from "react";
import ArtistAuth from "./pages/ArtistAuth";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ArtistHome from "./pages/ArtistHome";
import { ArtistAuthContext } from "./context/ArtistAuthContext";

const App = () => {
  const { isArtistAuthenticated } = useContext(ArtistAuthContext);
  const navigate = useNavigate();
  return (
    <div className=" w-screen h-screen ">
      <Routes>
        <Route
          path="/"
          element={isArtistAuthenticated ? <Navigate to="/artist-home" /> : <ArtistAuth />}
        />
        <Route path="/artist-home" element={isArtistAuthenticated ? <ArtistHome /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
