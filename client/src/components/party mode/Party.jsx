import React from "react";
import CreatePartyPage from "./CreatePartyPage";
import { Routes, Route } from "react-router-dom";
import PartyHome from "./PartyHome";

const Party = () => {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/create-party" element={<CreatePartyPage />} />
        <Route path="/" element={<PartyHome />} />
      </Routes>
    </div>
  );
};

export default Party;
