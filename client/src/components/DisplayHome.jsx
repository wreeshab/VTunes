import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets/assets";
import MusicCardSquare from "./MusicCardSquare";
import axios from "axios";

const DisplayHome = () => {
  const [url, setUrl] = useState("http://localhost:5000/api");
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${url}/songs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        console.log(response.data.songs);
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
        console.log(response.data);
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchSongs();
    fetchPlaylists();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="mb-4">
        <h1 className="font-bold text-2xl text-center">New Songs</h1>
        <div className="my-5 font-bold text-2xl flex overflow-auto gap-2">
          {songs.map((item, index) => (
            <MusicCardSquareYour
              key={index}
              name={item.name}
              image={item.thumbnailUrl}
              id={item._id}
            />
          ))}
        </div>
        <h1 className="font-bold text-2xl text-center">Your Playlists</h1>
        <div className="my-5 font-bold text-2xl flex overflow-auto gap-2">
          {playlists.map((item, index) => (
            <CardSquare
              key={index}
              name={item.name}
              image={item.thumbnail}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
