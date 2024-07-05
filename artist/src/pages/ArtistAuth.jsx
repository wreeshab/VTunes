import React, { useState } from "react";
import ArtistLogin from "../components/ArtistLogin";

import ArtistRegister from "../components/ArtistRegister";

const ArtistAuth = () => {
  const [currState, setCurrState] = useState("register");
  return (
    <div className="">
      {currState === "login" ? <ArtistLogin setCurrState={setCurrState} /> : <ArtistRegister setCurrState={setCurrState} />}
    </div>
  );
};

export default ArtistAuth;
