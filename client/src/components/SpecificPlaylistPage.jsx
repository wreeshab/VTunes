import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { url } from "../data/backenUrl";
import { FaPlayCircle } from "react-icons/fa";
import { PlayerContext } from "../context/PlayerContext";
import { BsThreeDotsVertical } from "react-icons/bs";

const SpecificPlaylistPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);

  const { addToQueue, clearQueue } = useContext(PlayerContext);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`${url}/playlist/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        if (response) {
          setPlaylist(response.data);
        } else {
          console.error("Failed to fetch playlist");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [id]);

  const handlePlayAll = () => {
    clearQueue();
    setTimeout(() => {
      addToQueue(playlist.songsArray);
    }, 150);
    console.log(playlist.songsArray);
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="rounded  h-2/5 bg-gradient-to-t from-gray-100 to-lime-600 flex flex-col justify-end p-5">
        <div className="flex justify-between items-center pr-10">
          <div>
            <h1 className="text-5xl md:text-8xl text-white font-extrabold mb-2">
              {playlist.playlist.name}
            </h1>
            <p className="text-lg md:text-xl font-bold text-gray-500">
              By {user.name}
            </p>
          </div>
          <FaPlayCircle
            className="text-6xl md:text-7xl hidden md:block text-green-800 cursor-pointer"
            onClick={handlePlayAll}
          />
        </div>
      </div>
      <div className="h-3/5 overflow-y-auto pt-16 flex flex-col items-center gap-2">
        {playlist.songsArray.map((song, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r w-full md:w-3/5 from-lime-500 to-gray-100 p-4 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer transition transform justify-between "
            >
              <div className="flex items-center gap-4">
                <img
                  src={song.thumbnailUrl}
                  alt=""
                  className="w-10 h-10 object-cover rounded-md"
                />
                <div>
                  <p className="text-lg font-semibold">{song.name}</p>
                  <p>{song.artist.name}</p>
                </div>
              </div>
              <BsThreeDotsVertical className="text-2xl text-gray-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecificPlaylistPage;
