import React, { useContext, useEffect, useState } from "react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import { url } from "../../data/backenUrl";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { SocketContext } from "../../context/SocketContext";

const AllFriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const { onlineUsers } = useContext(SocketContext);

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

  // Separate online and offline friends
  const onlineFriends = friends.filter((friend) => onlineUsers.includes(friend._id));
  const offlineFriends = friends.filter((friend) => !onlineUsers.includes(friend._id));

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
        {/* Render online friends */}
        {onlineFriends.map((friend, index) => (
          <FriendCard key={index} friend={friend} online={true} />
        ))}
        {/* Render offline friends */}
        {offlineFriends.map((friend, index) => (
          <FriendCard key={index} friend={friend} online={false} />
        ))}
      </div>
    </div>
  );
};

const FriendCard = ({ friend, online }) => (
  <div
    className="w-full gap-4 md:w-[80%] bg-white/15 text-white flex flex-col items-center justify-between p-3 px-4 rounded my-1.5 cursor-pointer shadow-lg backdrop-blur-lg transition-all duration-300 ease-in-out hover:bg-white/40"
  >
    <div className="flex items-center justify-between w-full gap-3">
      <div className="flex items-center gap-3">
        <FaUser className="text-3xl" />
        <p className="font-semibold text-md">{friend.name}</p>
      </div>
      <p>
        Status :{" "}
        {online ? (
          <span className="text-green-500">Online</span>
        ) : (
          <span className="text-red-500">Offline</span>
        )}
      </p>
    </div>
    <div className="flex items-center justify-between w-full">
      <div>
        <p>Joined : {friend.createdAt.slice(0, 10)}</p>
      </div>
      <div>
        <p>Currently Playing : {friend.currentlyPlaying}</p>
      </div>
    </div>
  </div>
);

export default AllFriendsPage;
