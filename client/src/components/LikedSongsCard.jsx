//note dont use  toast not looking good
import React, { useContext, useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { likeSong, dislikeSong } from "../helpers/LikeDislike";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlayerContext } from "../context/PlayerContext";

const LikedSongCard = ({ song, removeFromLikedPage, setLikedSongs }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const [likes, setLikes] = useState(song.likes);
  const [dislikes, setDislikes] = useState(song.dislikes);
  const { setTrackAndPlay } = useContext(PlayerContext);

  const handleLike = async () => {
    const result = await likeSong(song._id);
    if (result.success) {
      if (likes.includes(userId)) {
        setLikes(likes.filter((id) => id !== userId));
        removeFromLikedPage(song._id);
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
    const result = await dislikeSong(song._id);
    if (result.success) {
      if (dislikes.includes(userId)) {
        setDislikes(dislikes.filter((id) => id !== userId));
        toast.info("Dislike removed", { autoClose: 500 });
      } else {
        setDislikes([...dislikes, userId]);
        setLikes(likes.filter((id) => id !== userId));
        removeFromLikedPage(song._id);
        toast.success("Song disliked", { autoClose: 500 });
      }
    } else {
      console.error(result.message);
      toast.error("Error disliking the song", { autoClose: 500 });
    }
  };

  return (
    <div
      className="w-full  md:w-[60%]  bg-gradient-to-l from-red-300 to-red-600 text-white flex items-center justify-between p-4 rounded-xl my-2 cursor-pointer transition transform "
      onClick={() => {
        setTrackAndPlay(song.audioUrl, {
          name: song.name,
          artist: song.artist.name,
          image: song.thumbnailUrl,
        });
      }}
    >
      <div className="flex gap-3">
        <div className="flex items-center gap-3">
          <img
            src={song.thumbnailUrl}
            className="w-10 h-10 rounded-2xl"
            alt=""
          />
        </div>
        <div>
          <p className="font-semibold">{song.name}</p>
          <p className="text-xs">{song.artist.name}</p>
        </div>
      </div>
      <div className="flex text-xl items-center gap-5">
        <div
          className="flex items-center justify-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <p className="font-semibold text-xm">{likes?.length}</p>
          {likes?.includes(userId) ? (
            <BiSolidLike className="text-red-600" />
          ) : (
            <BiLike />
          )}
        </div>
        <div
          className="flex items-center justify-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            handleDislike();
          }}
        >
          <p className="font-semibold text-xm">{dislikes?.length}</p>
          {dislikes?.includes(userId) ? <BiSolidDislike /> : <BiDislike />}
        </div>
      </div>
    </div>
  );
};

export default LikedSongCard;
