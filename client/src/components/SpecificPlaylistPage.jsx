import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { url } from "../data/backenUrl";

const SpecificPlaylistPage = () => {
  const { id } = useParams(); // Get the playlist ID from the URL
  const { user } = useContext(AuthContext);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`${url}/playlist/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
        if (response) {
          setPlaylist(response);
        } else {
          console.error("Failed to fetch playlist");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchPlaylist();
  }, [id]);

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return <div>helllo</div>;
};

export default SpecificPlaylistPage;
