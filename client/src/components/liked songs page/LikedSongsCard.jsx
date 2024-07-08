import React, { useContext, useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { likeSong, dislikeSong } from "../../helpers/LikeDislike";
import { PlayerContext } from "../../context/PlayerContext";

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
      } else {
        setLikes([...likes, userId]);
        setDislikes(dislikes.filter((id) => id !== userId));
      }
    } else {
      console.error(result.message);
    }
  };

  const handleDislike = async () => {
    const result = await dislikeSong(song._id);
    if (result.success) {
      if (dislikes.includes(userId)) {
        setDislikes(dislikes.filter((id) => id !== userId));
      } else {
        setDislikes([...dislikes, userId]);
        setLikes(likes.filter((id) => id !== userId));
        removeFromLikedPage(song._id);
      }
    } else {
      console.error(result.message);
    }
  };

  return (
    <div
      className="w-full md:w-[80%] bg-white/15 text-white flex items-center justify-between p-3 px-4 rounded my-1.5 cursor-pointer shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:bg-white/40"
      onClick={() => {
        setTrackAndPlay(song.audioUrl, {
          name: song.name,
          artist: song.artist.name,
          image: song.thumbnailUrl,
        });
      }}
    >
      <div className="flex gap-3 items-center">
        <img
          src={song.thumbnailUrl}
          className="w-10 h-10 rounded-md"
          alt={song.name}
        />
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
