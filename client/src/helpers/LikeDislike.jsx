import axios from "axios";
import { url } from "../data/backenUrl";

export const likeSong = async(songId) => {
  try {
    console.log(songId);
    const response = await axios.post(`${url}/songs/like/${songId}`,{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error liking the song:", error);
    return { success: false, message: error.message };
  }
};

export const dislikeSong =  async(songId) => {
  try {
    const response = await axios.post(`${url}/songs/dislike/${songId}`,{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error("Error disliking the song:", error.message);
    return { success: false, message: error.message };
  }
};
