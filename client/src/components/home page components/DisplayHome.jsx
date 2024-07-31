import React, { useEffect, useState } from "react";
import MusicCardSquare from "./MusicCardSquare";
import axios from "axios";
import Navbar from "../Navbar";
import { url } from "../../data/backenUrl";
import { useNavigate } from "react-router-dom";

const DisplayHome = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${url}/songs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        setSongs(response.data.songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

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
        console.error("Error fetching playlists:", error);
      }
    };

    fetchSongs();
    fetchPlaylists();
  }, []);

  const handlePlaylistClick = (playlistId) => {
    navigate(`/dashboard/playlist/${playlistId}`);
  };

  return (
    <div className="px-7 pt-4">
      <Navbar />
      <div className="mb-4">
        <h1 className="font-bold text-2xl text-center mt-4">New Songs</h1>
        <div className="my-5 font-bold text-2xl flex overflow-auto gap-2">
          {songs.map((item, index) => (
            <MusicCardSquare
              key={index}
              name={item.name}
              image={item.thumbnailUrl}
              id={item._id}
              audioUrl={item.audioUrl}
              artist={item.artist}
              lyrics={item.lyrics ? item.lyrics : ""}
              djMode={item.djMode ? item.djMode : 0}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-2xl text-center mt-4">Playlists</h1>
        <div className="my-5 font-bold text-2xl flex overflow-auto gap-2">
          {playlists.map((playlist, index) => (
            <div
              key={index}
              onClick={() => handlePlaylistClick(playlist._id)}
              className="cursor-pointer p-4 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform  hover:bg-gray-700"
            >
              <img
                src={playlist.thumbnail}
                alt={playlist.name}
                className=" h-48 w-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-white">
                {playlist.name}
              </h3>
              <p className="text-gray-400">{playlist.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
