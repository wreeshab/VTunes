import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../data/backenUrl";
import { ToastContainer, toast } from "react-toastify";

const PartyHome = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [partyQueue, setPartyQueue] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${url}/user-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data.friends);
        setFriends(response.data.friends);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch friends");
      }
    };

    fetchFriends();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await axios.get(`${url}/search`, {
        params: { query: searchQuery, type: "music" },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.results);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
      toast.error("Failed to search songs");
    }
  };

  const handleAddToQueue = (song) => {
    setPartyQueue([...partyQueue, song]);
    toast.success("Song added to queue");
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 p-5 bg-gray-800 text-teal-200">
        <h2 className="text-2xl font-bold mb-5">Invite Friends</h2>
        {friends.map((friend) => (
          <div key={friend._id} className="flex items-center mb-4">
            <span className="flex-1">{friend.name}</span>
            <button className="ml-2 p-1 bg-teal-500 hover:bg-teal-600 text-white rounded">
              Invite
            </button>
          </div>
        ))}
      </div>
      <div className="w-1/3 p-5 bg-gray-700 text-teal-200 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-5">Search Songs</h2>
        <form onSubmit={handleSearch} className="w-full mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for songs"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
          <button
            type="submit"
            className="w-full mt-2 p-2 rounded bg-teal-500 hover:bg-teal-600 text-white font-bold"
          >
            Search
          </button>
        </form>
        <div className="w-full flex flex-col items-center">
          {searchResults.map((song) => (
            <div
              key={song._id}
              className="w-full flex justify-between items-center mb-2 p-2 bg-gray-600 rounded"
            >
              <span>{song.name}</span>
              <button
                onClick={() => handleAddToQueue(song)}
                className="p-1 bg-teal-500 hover:bg-teal-600 text-white rounded"
              >
                Add to Queue
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 p-5 bg-gray-800 text-teal-200">
        <h2 className="text-2xl font-bold mb-5">Party Queue</h2>
        {partyQueue.map((song, index) => (
          <div key={index} className="flex items-center mb-4">
            <span className="flex-1">{song.name}</span>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PartyHome;
