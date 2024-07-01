import React from "react";
import ArtistNavbar from "../components/ArtistNavbar";
import LeftHalf from "../layouts/LeftHalf";
import RightHalf from "../layouts/RightHalf";

const ArtistHome = () => {
  return (
    <div className="bg-black w-full h-screen flex flex-col">
      <ArtistNavbar />
      <div className="flex h-[93%]">
        <LeftHalf/>
        <RightHalf/>
      </div>
    </div>
  );
};

export default ArtistHome;
