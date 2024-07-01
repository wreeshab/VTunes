import React from "react";

const RightHalf = () => {
  return (
    <div className="w-[50%] flex flex-col items-center justify-center p-6 bg-black rounded-lg shadow-md">
      <h1 className="font-bold text-4xl text-white mb-8">
        Upload Your Next Track
      </h1>
      <form className="w-full max-w-sm space-y-6">
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
          />
        </div>
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
