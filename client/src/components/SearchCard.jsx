import React, { useState } from 'react';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { FaUserFriends, FaPlus } from 'react-icons/fa';
import { likeSong, dislikeSong } from '../helpers/LikeDislike'; // Ensure the path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchCard = ({ type, object }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage
  const userId = user.id;
  const [likes, setLikes] = useState(object.likes);
  const [dislikes, setDislikes] = useState(object.dislikes);

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

  if (type === 'artists') {
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
  } else if (type === 'users') {
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
  } else if (type === 'music') {
    return (

      <div className="w-[80%] bg-teal-800 text-white flex items-center justify-between p-4 rounded-md my-2">
        <div className="flex gap-3">
          <div className="flex items-center gap-3">
            <img src={object.thumbnailUrl} className="w-10 h-10 rounded-2xl" alt="" />
          </div>
          <div>
          <ToastContainer />
            <p className="font-semibold">{object.name}</p>
            <p className="text-xs">{object.artist.name}</p>
          </div>
        </div>
        <div className="flex text-xl items-center gap-5">
          <div className="flex items-center justify-center gap-1" onClick={handleLike}>
            <p className="font-semibold text-xm">{likes?.length}</p>
            {likes?.includes(userId) ? <BiSolidLike /> : <BiLike />}
          </div>
          <div className="flex items-center justify-center gap-1" onClick={handleDislike}>
            <p className="font-semibold text-xm">{dislikes?.length}</p>
            {dislikes?.includes(userId) ? (
              <BiSolidDislike />
            ) : (
              <BiDislike />
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SearchCard;
