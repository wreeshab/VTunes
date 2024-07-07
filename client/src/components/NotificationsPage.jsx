import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { url } from "../data/backenUrl";

const NotificationsPage = ({ setShowNotifications }) => {
  const { user } = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(
          `${url}/friend-request/get-all-req-recieved`,
          {
            params: {
              id: user.id,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setFriendRequests(response.data);
      } catch (err) {
        console.log("Error fetching friend requests:", err);
      }
    };

    fetchFriendRequests();
  }, [user.id]);

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `${url}/friend-request/accept`,
        {
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedFriendRequests = friendRequests.filter(
        (request) => request._id !== requestId
      );
      setFriendRequests(updatedFriendRequests);
      console.log(response);
    } catch (err) {
      console.log("Error accepting friend request:", err);
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await axios.post(
        `${url}/friend-request/decline`,
        {
          requestId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedFriendRequests = friendRequests.filter(
        (request) => request._id !== requestId
      );
      setFriendRequests(updatedFriendRequests);
      console.log(response);
    } catch (err) {
      console.log("Error declining friend request:", err);
    }
  };

  return (
    <div className="fixed top-0 right-0 lg:w-1/3 w-full h-full bg-gray-500 text-black z-50 opacity-90">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Notifications</h2>
        <button className="text-2xl font-extrabold">
          <IoClose onClick={() => setShowNotifications(false)} />
        </button>
      </div>

      <div className="p-4">
        {friendRequests.map(
          (request) =>
            request.status === "pending" && (
              <div key={request._id} className="border-b border-gray-400 py-2">
                <p className="font-semibold">
                  {request.from.name} has sent you a friend request
                </p>
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md "
                    onClick={() => handleDeclineRequest(request._id)}
                  >
                    Decline
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
                    onClick={() => handleAcceptRequest(request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
