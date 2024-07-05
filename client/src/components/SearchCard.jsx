import React, { useContext, useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { FaUserFriends, FaPlus } from "react-icons/fa";
import { likeSong, dislikeSong } from "../helpers/LikeDislike";
import { ToastContainer, toast } from "react-toastify"; // Correct import of ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import { PlayerContext } from "../context/PlayerContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { url } from "../data/backenUrl";

const SearchCard = ({ type, object }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const [likes, setLikes] = useState(object.likes);
  const [dislikes, setDislikes] = useState(object.dislikes);
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylistTab, setShowPlaylistTab] = useState(false);
  //ref part for song..
  const { setTrackAndPlay, addToQueue, clearQueue } = useContext(PlayerContext);

  const handleLike = async () => {
    const result = await likeSong(object._id);
    if (result.success) {
      if (likes.includes(userId)) {
        setLikes(likes.filter((id) => id !== userId));
        toast.info("Like removed", { autoClose: 500 });
      } else {
        setLikes([...likes, userId]);
        setDislikes(dislikes.filter((id) => id !== userId));
        toast.success("Song liked", { autoClose: 500 });
      }
    } else {
      console.error(result.message);
      toast.error("Error liking the song", { autoClose: 500 });
    }
  };

  const handleDislike = async () => {
    const result = await dislikeSong(object._id);
    if (result.success) {
      if (dislikes.includes(userId)) {
        setDislikes(dislikes.filter((id) => id !== userId));
        toast.info("Dislike removed", { autoClose: 500 });
      } else {
        setDislikes([...dislikes, userId]);
        setLikes(likes.filter((id) => id !== userId));
        toast.success("Song disliked", { autoClose: 500 });
      }
    } else {
      console.error(result.message);
      toast.error("Error disliking the song", { autoClose: 500 });
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`${url}/playlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setPlaylists(response.data);
      } else {
        console.error("Failed to fetch playlists");
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handleThreeDotsClick = async () => {
    await fetchPlaylists();
    setShowPlaylistTab(true);
  };

  const addToPlaylist = async (playlistId) => {
    try {
      const response = await axios.post(
        `${url}/playlist/${playlistId}/add-song`,
        { songId: object._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Song added to playlist", { autoClose: 500 });
        setShowPlaylistTab(false);
      } else {
        toast.error("Failed to add song to playlist", { autoClose: 500 });
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast.error(error.response.data.message, { autoClose: 500 });
    }
  };

  const playSong = () => {
    clearQueue();
    addToQueue([object]);
    setTrackAndPlay(object.audioUrl, {
      name: object.name,
      artist: object.artist.name,
      image: object.thumbnailUrl,
    });
  };

  if (type === "artists") {
    return (
      <div className="w-[80%] bg-teal-800 text-white flex items-center justify-between p-4 rounded-md my-2">
        <div className="flex items-center gap-3">
          <p className="font-bold rounded-full bg-white text-black p-2 w-7 h-7 flex items-center justify-center">
            {object.name[0].toUpperCase()}
          </p>
          <p className="font-semibold">{object.name}</p>
        </div>
        <button>Follow</button>
      </div>
    );
  } else if (type === "users") {
    return (
      <div className="w-[80%] bg-teal-800 text-white flex items-center justify-between p-4 rounded-md my-2">
        <div className="flex items-center gap-3">
          <p className="font-bold rounded-full bg-white text-black p-2 w-7 h-7 flex items-center justify-center">
            {object.name[0].toUpperCase()}
          </p>
          <p className="font-semibold">{object.name}</p>
        </div>
        <div>
          <FaUserFriends />
          <FaPlus />
        </div>
      </div>
    );
  } else if (type === "music") {
    return (
      <div className="w-[80%] bg-teal-800 text-white flex items-center justify-between p-4 rounded-md my-2 cursor-pointer">
        <div
          className="flex gap-3"
          onClick={() => {
            playSong();
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src={object.thumbnailUrl}
              className="w-10 h-10 rounded-xl"
              alt=""
            />
          </div>
          <div>
            <p className="font-semibold">{object?.name}</p>
            <p className="text-xs">{object?.artist?.name}</p>
          </div>
        </div>

        <div className="flex text-xl items-center gap-5">
          <div className="flex text-xl items-center gap-5">
            <div
              className="flex items-center justify-center gap-1"
              onClick={handleLike}
            >
              <p className="font-semibold text-sm">{likes?.length}</p>
              {likes?.includes(userId) ? <BiSolidLike /> : <BiLike />}
            </div>
            <div
              className="flex items-center justify-center gap-1"
              onClick={handleDislike}
            >
              <p className="font-semibold text-sm">{dislikes?.length}</p>
              {dislikes?.includes(userId) ? <BiSolidDislike /> : <BiDislike />}
            </div>
          </div>
          <BsThreeDotsVertical
            onClick={(e) => {
              e.stopPropagation();
              handleThreeDotsClick();
            }}
          />
        </div>
        {showPlaylistTab && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowPlaylistTab(false)}
          >
            <div
              className="bg-white p-5 rounded-md w-full max-w-md mx-4 sm:mx-6 md:mx-auto text-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 text-center">
                Add to Playlist
              </h2>
              <ul className="max-h-60 overflow-y-auto">
                {playlists.map((playlist) => (
                  <li
                    key={playlist._id}
                    className="cursor-pointer p-2 hover:bg-gray-200 rounded text-center font-semibold"
                    onClick={() => addToPlaylist(playlist._id)}
                  >
                    {playlist.name}
                  </li>
                ))}
              </ul>
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full"
                onClick={() => {
                  console.log(object);
                  addToQueue([object]); // Add the selected song to the queue
                  setShowPlaylistTab(false);
                  toast.success("Song added to queue", { autoClose: 500 });
                }}
              >
                Add to Queue
              </button>
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full"
                onClick={() => setShowPlaylistTab(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default SearchCard;
