import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SongCardForArtist from "../components/SongCardForArtist";
import { url } from "../data/backendUrl";

const LeftHalf = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`${url}/songs/get-all-for-artist`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSongs(response.data.songs);
        console.log(response.data.songs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="w-[60%] flex flex-col items-center bg-gradient-to-r from-gray-400 to-gray-800 p-6 shadow-md">
      <ToastContainer />
      <h1 className="font-bold text-4xl text-white mb-8">Your Songs</h1>
      <div className="flex flex-wrap justify-center p-5 w-full gap-6 overflow-scroll ">
        {songs.length > 0 ? (
          songs.map((song) => (
            <SongCardForArtist
              key={song._id}
              song={song}
              userId={localStorage.getItem("userId")} // Assuming userId is stored in localStorage
              setTrackAndPlay={(audioUrl, songInfo) => {
                // Implement this function to handle playing the song
              }}
              handleLike={(songId) => {
                // Implement this function to handle liking the song
              }}
              handleDislike={(songId) => {
                // Implement this function to handle disliking the song
              }}
              likes={song.likes}
              dislikes={song.dislikes}
            />
          ))
        ) : (
          <p className="text-white">No songs available.</p>
        )}
      </div>
    </div>
  );
};

export default LeftHalf;
