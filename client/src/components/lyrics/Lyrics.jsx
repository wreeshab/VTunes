import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { PlayerContext } from "../../context/PlayerContext";
import { useEffect } from "react";
import { useState } from "react";


const Lyrics = ({ closeLyrics }) => {
  const { songDetails } = useContext(PlayerContext);
  const [lyrics, setLyrics] = useState(songDetails.lyrics);

  useEffect(() => {
    setLyrics(songDetails.lyrics);
  }, [songDetails]);
  return (
    <div className="fixed top-0 right-0 lg:w-1/3 w-full h-full bg-gray-900 text-white z-50 opacity-90">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Lyrics</h2>
        <button onClick={closeLyrics} className="text-xl">
          <IoClose />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-full">
        {songDetails.lyrics ? (
          <pre className="whitespace-pre-wrap">{songDetails.lyrics}</pre>
        ) : (
          <p className="text-center mt-4">Artist is Lazy :/</p>
        )}
      </div>
    </div>
  );
};

export default Lyrics;
