import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../../data/backenUrl";
import axios from "axios";

const CreatePlaylistPage = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false); //this is private/ public toggle
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (!playlistName || !thumbnailImage) {
      toast.error("Please fill in all fields");
      return;
    }

    formData.append("name", playlistName);
    formData.append("thumbnailImage", thumbnailImage);
    formData.append("private", isPrivate);

    try {
      setLoading(true);

      const response = await axios.post(`${url}/playlist/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response);
      toast.success(response.data.message);
      setPlaylistName("");
      setThumbnailImage(null);
      setIsPrivate(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="h-full w-full lg:w-1/2 p-5 bg-gray-700 text-teal-200 flex flex-col items-center justify-center gap-10">
        <h1 className="text-5xl font-bold mb-5 text-center">Create Playlist</h1>
        <form action="" className="flex flex-col gap-4 w-[85%]">
          <label htmlFor="name" className="text-lg">
            Playlist Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            onChange={(e) => setPlaylistName(e.target.value)}
            value={playlistName}
          />
          <label htmlFor="thumbnail-image" className="text-lg">
            Thumbnail Image
          </label>
          <input
            type="file"
            name="thumbnailImage"
            id="thumbnail-image"
            accept="image/jpeg, image/png"
            className="p-2 rounded bg-gray-700 border border-gray-600 text-white"
            onChange={(e) => setThumbnailImage(e.target.files[0])}
          />
          <div className="flex items-center">
            <label htmlFor="isPrivate" className="text-lg mr-2">
              Private Playlist
            </label>
            <input
              type="checkbox"
              name="isPrivate"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded border-gray-600 text-teal-500"
              value={isPrivate}
            />
          </div>
          {loading && (
            <p className="text-white mt-2">
              Uploading... Please wait. Do not refresh.
            </p>
          )}
          <button
            type="submit"
            className="p-2 mt-4 rounded bg-teal-500 hover:bg-teal-600 text-white font-bold"
            onClick={onSubmit}
            disabled={loading}
          >
            Create
          </button>
        </form>
      </div>
      <div className="h-full w-full lg:w-1/2 flex flex-col items-center justify-center">
        <h1>Create Party Page not ready</h1>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;
