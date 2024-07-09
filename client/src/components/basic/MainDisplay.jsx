import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchPage from "../SearchPage";
import AllPlaylistsPage from "../playlist/AllPlaylistsPage";
import ProfilePage from "../ProfilePage";
import DisplayHome from "../home page components/DisplayHome";
import LikedSongsPage from "../liked songs page/LikedSongsPage";
import CreatePlaylistPage from "../playlist/CreatePlaylistPage";
import SpecificPlaylistPage from "../playlist/SpecificPlaylistPage";
import AllFriendsPage from "../friends/AllFriendsPage";

const MainDisplay = () => {
  // bg-gradient-to-t from-black via-gray-900 to-purple-700 bg-gradient-stops
  return (
    <div className="w-[100%] bg-black  text-white overflow-auto lg:w-[75%] ">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/liked-songs" element={<LikedSongsPage />} />
        <Route path="/create-playlist" element={<CreatePlaylistPage />} />
        <Route path="/all-playlists" element={<AllPlaylistsPage />} />
        <Route path="/playlist/:id" element={<SpecificPlaylistPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/friends" element={<AllFriendsPage />} />

        <Route path="/contact" element={"hello"} />
      </Routes>
    </div>
  );
};

export default MainDisplay;
