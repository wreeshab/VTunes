import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { RiPlayListFill } from "react-icons/ri";
import { url } from "../../data/backenUrl";
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
      <div className="rounded h-2/5 bg-gradient-to-t from-black to-teal-400 flex flex-col justify-end p-5">
        <div className="flex justify-between items-center pr-10">
          <div>
            <h1 className="text-5xl md:text-8xl font-extrabold mb-2">
              Playlists
            </h1>
            <p className="text-lg md:text-xl font-bold text-gray-500">
              By {user.name}
            </p>
          </div>
          <RiPlayListFill className="text-6xl md:text-9xl hidden md:block text-gray-200" />
        </div>
      </div>
      <div className="h-3/5 pt-16 w-full flex flex-col items-center gap-2  ">
        {playlists.map((playlist) => (
          <PlaylistPageCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default AllPlaylistsPage;
