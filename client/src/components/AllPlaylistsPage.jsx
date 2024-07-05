import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { RiPlayListFill } from "react-icons/ri";
import { url } from "../data/backenUrl";
import axios from "axios";
import PlaylistPageCard from "./PlaylistPageCard";

const AllPlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${url}/playlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setPlaylists(response.data);
      } catch (error) {
        console.log(error.data.message);
      }
    };
    fetchPlaylists();
  }, []);

  const { user } = useContext(AuthContext);
  return (
    <div className="h-full flex flex-col">
      <div className="rounded h-2/5 bg-gradient-to-t from-gray-100 to-teal-600 flex flex-col justify-end p-5">
        <div className="flex justify-between items-center pr-10">
          <div>
            <h1 className="text-5xl md:text-8xl font-extrabold mb-2">
              Playlists
            </h1>
            <p className="text-lg md:text-xl font-bold text-gray-500">
              By {user.name}
            </p>
          </div>
          <RiPlayListFill className="text-6xl md:text-9xl hidden md:block text-gray-800" />
        </div>
      </div>
      <div className="h-3/5 pt-16 w-full flex items-center justify-center  ">
        <div className="flex flex-col items-center w-11/12 md:w-3/4 overflow-y-scroll gap-3 pb-4">
          {playlists.map((playlist) => (
            <PlaylistPageCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPlaylistsPage;
