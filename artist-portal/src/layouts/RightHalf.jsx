import React, { useState } from "react";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RightHalf = () => {
  const [trackName, setTrackName] = React.useState("");
  const [thumbnailImage, setThumbnailImage] = React.useState(null);
  const [trackFile, setTrackFile] = useState(null);
 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trackName || !thumbnailImage || !trackFile) {
      setResponseMessage("All fields are required.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", trackName);
    formData.append("thumbnailImage", thumbnailImage);
    formData.append("trackFile", trackFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/songs/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
    
      setIsLoading(false);
      setTrackName("");
      setThumbnailImage(null);
      setTrackFile(null);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[50%] flex flex-col items-center justify-center p-6 bg-black rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="font-bold text-4xl text-white mb-8">
        Upload Your Next Track
      </h1>
      <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="track-name" className="text-white mb-2">
            Track Name
          </label>
          <input
            type="text"
            name="trackName"
            id="track-name"
            className="p-3 border border-gray-300 rounded-full focus:outline-none focus:border-white bg-black text-white px-7"
            placeholder="Enter track name"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="thumbnail-image" className="text-white mb-2">
            Thumbnail Image
          </label>
          <input
            type="file"
            name="thumbnailImage"
            id="thumbnail-image"
            accept="image/jpeg, image/png"
            className="p-3 border border-gray-300 rounded-full focus:outline-none focus:border-white bg-black text-white px-7"
            onChange={(e) => setThumbnailImage(e.target.files[0])}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="track-file" className="text-white mb-2">
            Track File
          </label>
          <input
            type="file"
            name="trackFile"
            id="track-file"
            accept="audio/mpeg, audio/wav"
            className="p-3 border border-gray-300 rounded-full focus:outline-none focus:border-white bg-black text-white  items-center px-7 "
            onChange={(e) => setTrackFile(e.target.files[0])}
            required
          />
        </div>
        {isLoading && <p className="text-white text-center font-semibold ">Uploading... Do not refresh the page</p>}
        
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded-full hover:bg-gray-200 transition duration-300 font-bold"
        >
          Upload Track
        </button>
      </form>
    </div>
  );
};

export default RightHalf;
