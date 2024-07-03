import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
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
        console.log(response.data); // Logging response data
        console.log(response.data.songs); // Logging songs data
        setSongs(response.data.songs); // Setting songs state
      } catch (error) {
        console.error("Error fetching songs:", error); // Error handling
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(`${url}/playlist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data); // Logging response data
        setPlaylists(response.data); // Setting playlists state
      } catch (error) {
        console.error("Error fetching playlists:", error); // Error handling
      }
    };

    fetchSongs();
    fetchPlaylists();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mb-4">
        <h1 className="font-bold text-2xl text-center ">New Songs</h1>
        <div className="my-5 font-bold text-2xl flex overflow-auto gap-2 ">
          {songs.map((item, index) => (
            <MusicCardSquare
              key={index}
              name={item.name}
              image={item.thumbnailUrl}
              id={item._id}
              audioUrl={item.audioUrl}
              artist = {item.artist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHome;
