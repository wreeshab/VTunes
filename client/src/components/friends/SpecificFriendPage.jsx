import React, { useEffect, useState } from "react";
import { LiaUserSolid } from "react-icons/lia";
import { url } from "../../data/backenUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import PublicPlaylistOnFriendPage from "./PublicPlaylistOnFriendPage";

const SpecificFriendPage = () => {
  const params = useParams();
  const id = params.id;
  const [friend, setFriend] = useState();
  const [publicPlaylists, setPublicPlaylists] = useState([]);

  useEffect(() => {
    const fetchPublicPlaylists = async () => {
      try {
        const response = await axios.get(
          `${url}/playlist/public-playlists/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPublicPlaylists(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchFriendDetails = async () => {
      try {
        const response = await axios.get(
          `${url}/friend-request/friend-details/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFriend(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFriendDetails();
    fetchPublicPlaylists();
  }, [id]);

  return (
    <div className="h-full flex flex-col">
      <div className="rounded h-2/5 bg-gradient-to-t from-black to-green-700 flex flex-col justify-end p-5 mb-5">
        <div className="flex justify-between items-center pr-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white">
              {friend?.name}
            </h1>
            <p className="text-lg md:text-xl font-bold text-blue-300">
              Your Friend
            </p>
          </div>
          <LiaUserSolid className="text-6xl md:text-9xl hidden md:block text-blue-300" />
        </div>
      </div>
      <div className="h-3/5 overflow-y-auto pt-16 flex flex-col  items-center gap-2">
        <h1 className="text-2xl font-bold text-white mb-4">Public Playlists</h1>
        <div className="w-[95%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {publicPlaylists.length > 0 ? (
            publicPlaylists.map((playlist, index) => (
              <PublicPlaylistOnFriendPage playlist={playlist} key={index} />
            ))
          ) : (
            <p>No public playlists</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecificFriendPage;
