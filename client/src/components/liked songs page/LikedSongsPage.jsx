import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { url } from "../../data/backenUrl";
import axios from "axios";
import { FaHeart } from "react-icons/fa6";
import LikedSongCard from "./LikedSongsCard";

const LikedSongsPage = () => {
  const [likedSongs, setLikedSongs] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(`${url}/songs/liked-songs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setLikedSongs(response.data.likedSongs);
          console.log(response.data.likedSongs);
        } else {
          console.error("Failed to fetch liked songs");
        }
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    fetchLikedSongs();
  }, [user]);

  const removeFromLikedPage = (songId) => {
    setLikedSongs((previousSongs) =>
      previousSongs.filter((song) => song._id !== songId)
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="rounded h-2/5 bg-gradient-to-t from-black to-red-600 flex flex-col justify-end p-5 mb-5">
        <div className="flex justify-between items-center pr-10">
          <div>
            <h1 className="text-5xl md:text-8xl font-extrabold">Liked</h1>
            <p className="text-lg md:text-xl font-bold text-red-500">
              By {user.name}
            </p>
          </div>
          <FaHeart className="text-6xl md:text-9xl hidden md:block text-red-500" />
        </div>
      </div>
      <div className="flex flex-col mt-10 items-center overflow-y-scroll h-3/5 w-full">
        {likedSongs.map((song) => (
          <LikedSongCard
            key={song._id}
            removeFromLikedPage={removeFromLikedPage}
            setLikedSongs={setLikedSongs}
            song={song}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedSongsPage;
