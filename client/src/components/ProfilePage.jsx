import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { url } from "../data/backenUrl";
import { toast } from "react-toastify";
import axios from "axios";

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/user-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFetchedData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while fetching user data");
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }

    return `${day}${daySuffix} ${month} ${year}`;
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center mb-6">
        <FaUser className="text-gray-500 text-4xl mr-4" />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">
            Joined on:{" "}
            {fetchedData ? formatDate(fetchedData.createdAt) : "Loading..."}
          </p>
        </div>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
