import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../data/backendUrl";

const RightHalf = () => {
  const [trackName, setTrackName] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [trackFile, setTrackFile] = useState(null);
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [lyrics, setLyrics] = useState(""); // New state for lyrics
  const [djMode, setDjMode] = useState(""); // New state for DJ mode
  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnailChange = (e) => {
    setThumbnailImage(e.target.files[0]);
  };

  const handleTrackFileChange = (e) => {
    setTrackFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !trackName ||
      !thumbnailImage ||
      !trackFile ||
      !genre ||
      !language ||
      !lyrics ||
      !djMode
    ) {
      toast.error("All fields are required.", { autoClose: 1000 });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", trackName);
    formData.append("thumbnailImage", thumbnailImage);
    formData.append("trackFile", trackFile);
    formData.append("genre", genre);
    formData.append("language", language);
    formData.append("lyrics", lyrics); // Append lyrics to form data
    formData.append("djMode", djMode); // Append DJ mode to form data

    try {
      const response = await axios.post(`${url}/songs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);

      setIsLoading(false);
      setTrackName("");
      setThumbnailImage(null);
      setTrackFile(null);
      setGenre("");
      setLanguage("");
      setLyrics(""); // Clear lyrics state
      setDjMode(""); // Clear DJ mode state
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[40%] flex flex-col items-center justify-center p-6 bg-gradient-to-r from-gray-700 to-gray-900">
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
            className="p-3 border border-gray-600 rounded focus:outline-none focus:border-white bg-gray-900 text-white px-4"
            placeholder="Enter track name"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="thumbnail-image" className="text-white mb-2">
            Thumbnail Image
          </label>
          <div className="relative">
            <label
              htmlFor="upload-thumbnail"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg cursor-pointer transition duration-300"
            >
              Choose Thumbnail Image
            </label>
            <input
              type="file"
              id="upload-thumbnail"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={handleThumbnailChange}
            />
            {thumbnailImage && (
              <input
                type="text"
                readOnly
                className="mt-2 p-3 border border-gray-600 rounded bg-gray-900 text-white px-4"
                value={thumbnailImage.name}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="track-file" className="text-white mb-2">
            Track File
          </label>
          <div className="relative">
            <label
              htmlFor="upload-track"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg cursor-pointer transition duration-300"
            >
              Choose Track File
            </label>
            <input
              type="file"
              id="upload-track"
              accept="audio/mpeg, audio/wav"
              className="hidden"
              onChange={handleTrackFileChange}
            />
            {trackFile && (
              <input
                type="text"
                readOnly
                className="mt-2 p-3 border border-gray-600 rounded bg-gray-900 text-white px-4"
                value={trackFile.name}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="lyrics" className="text-white mb-2">
            Lyrics
          </label>
          <textarea
            name="lyrics"
            id="lyrics"
            className="p-3 border border-gray-600 rounded focus:outline-none focus:border-white bg-gray-900 text-white px-4"
            placeholder="Enter lyrics"
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dj-mode" className="text-white mb-2">
            DJ Mode (Beat Drop Time in seconds)
          </label>
          <input
            type="number"
            name="djMode"
            id="dj-mode"
            className="p-3 border border-gray-600 rounded focus:outline-none focus:border-white bg-gray-900 text-white px-4"
            placeholder="Enter time in seconds (0-35)"
            value={djMode}
            onChange={(e) => setDjMode(e.target.value)}
            min="0"
            max="35"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="genre" className="text-white mb-2">
              Genre
            </label>
            <select
              name="genre"
              id="genre"
              className="p-3 border border-gray-600 rounded focus:outline-none focus:border-white bg-gray-900 text-white px-4 appearance-none"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" disabled>
                Select genre
              </option>
              <option value="Classical">Classical</option>
              <option value="Pop">Pop</option>
              <option value="Melody">Melody</option>
              <option value="Rock">Rock</option>
              <option value="K-Pop">K-Pop</option>
              <option value="Unplugged">Unplugged</option>
              <option value="Karaoke">Karaoke</option>
              <option value="Phonk">Phonk</option>
              <option value="Hip Hop">Hip Hop</option>
              <option value="Electronic Dance">Electronic Dance</option>
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="language" className="text-white mb-2">
              Language
            </label>
            <select
              name="language"
              id="language"
              className="p-3 border border-gray-600 rounded focus:outline-none focus:border-white bg-gray-900 text-white px-4 appearance-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="" disabled>
                Select language
              </option>
              <option value="Tamil">Tamil</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Korean">Korean</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Telugu">Telugu</option>
              <option value="Kannada">Kannada</option>
            </select>
          </div>
        </div>
        {isLoading && (
          <p className="text-white text-center font-semibold">
            Uploading... Do not refresh the page
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-white text-black py-3 rounded hover:bg-gray-200 transition duration-300 font-bold"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default RightHalf;
