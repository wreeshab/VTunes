import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { url } from "../../data/backenUrl";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";

const AllFriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const { onlineUsers, socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${url}/user-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Something went wrong");
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleUpdateSong = ({ userId, songDetails }) => {
      setFriends((prevFriends) =>
        prevFriends.map((friend) =>
          friend._id === userId
            ? { ...friend, currentlyPlaying: songDetails }
            : friend
        )
      );
    };

    socket.on("updateSong", handleUpdateSong);

    return () => {
      socket.off("updateSong", handleUpdateSong);
    };
  }, [socket]);

  const onlineFriends = friends.filter((friend) =>
    onlineUsers.includes(friend._id)
  );
  const offlineFriends = friends.filter(
    (friend) => !onlineUsers.includes(friend._id)
  );

  return (
    <div className="h-full flex flex-col">
      <div className="rounded h-2/5 bg-gradient-to-t from-black to-violet-600 flex flex-col justify-end p-5 mb-5">
        <div className="flex justify-between items-center pr-10">
          <div>
            <p className="text-lg md:text-xl font-bold text-blue-500">Your</p>
            <h1 className="text-5xl md:text-8xl font-extrabold">Friends</h1>
          </div>
          <LiaUserFriendsSolid className="text-6xl md:text-9xl hidden md:block text-blue-500" />
        </div>
      </div>
      <div className="flex flex-col mt-10 items-center overflow-y-scroll h-3/5 w-full">
        {onlineFriends.map((friend, index) => (
          <FriendCard key={index} friend={friend} online={true} />
        ))}
        {offlineFriends.map((friend, index) => (
          <FriendCard key={index} friend={friend} online={false} />
        ))}
      </div>
    </div>
  );
};

const FriendCard = ({ friend, online }) => (
  <div className="w-full md:w-[80%] bg-white/15 text-white flex flex-col items-center justify-between p-4 rounded my-2 cursor-pointer shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:bg-white/20">
    <div className="flex items-center justify-between w-full gap-3 mb-2">
      <div className="flex items-center gap-3">
        <FaUser className="text-4xl text-blue-500" />
        <p className="font-semibold text-lg">{friend.name}</p>
      </div>
      <p className="text-md">
        Status:{" "}
        {online ? (
          <span className="text-green-400">Online</span>
        ) : (
          <span className="text-red-400">Offline</span>
        )}
      </p>
    </div>
    <div className="flex items-center justify-between w-full">
      <div>
        <p className="text-sm text-gray-300">
          Joined: {friend.createdAt.slice(0, 10)}
        </p>
      </div>
      <div className="flex items-center gap-3 bg-gray-800 p-2 rounded-lg">
        <p className="text-sm">Currently Playing:</p>
        {friend.currentlyPlaying && online ? (
          <div className="flex items-center gap-3 bg-gray-900 p-2 rounded-lg">
            <img
              src={friend.currentlyPlaying.image}
              alt={friend.currentlyPlaying.name}
              className="w-12 h-12 rounded-md hidden lg:block"
            />
            <div className="text-left">
              <p className="text-md font-semibold text-blue-400">
                {friend.currentlyPlaying.name}
              </p>
              <p className="text-sm text-gray-400">
                {friend.currentlyPlaying.artist}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Nothing</p>
        )}
      </div>
    </div>
  </div>
);

export default AllFriendsPage;
