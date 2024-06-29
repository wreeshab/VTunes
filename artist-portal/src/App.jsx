import React from "react";
import ArtistAuth from "./pages/ArtistAuth";
import { Route, Routes } from "react-router-dom";
import ArtistHome from "./pages/ArtistHome";

const App = () => {
  return (
    <div className=" w-screen h-screen ">
      <Routes>
        <Route path="/" element={<ArtistAuth />} />
        <Route path="/artist-home" element={<ArtistHome />} />
      </Routes>
    </div>
  );
};

export default App;
