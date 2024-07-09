import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { IoClose } from "react-icons/io5";

const Queue = ({ closeQueue }) => {
  const { queue, track, clearQueue } = useContext(PlayerContext);

  return (
    <div className="fixed top-0 right-0 lg:w-1/3 w-full h-full bg-gray-900 text-white z-50 opacity-90">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Queue</h2>
        <button onClick={closeQueue} className="text-xl">
          <IoClose />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-full">
        {queue.map((song, index) => (
          <div
            key={index}
            className={
              `p-2 my-4 rounded-lg opacity-100 bg-gray-800`
              // ${index === 0 ? "bg-green-500" : "bg-gray-800"}`
            }
          >
            {/* {index === 0 && (
              <p className="font-semibold text-black">Now Playing</p>
            )} */}
            <div className="flex items-center gap-4">
              <img
                src={song.thumbnailUrl}
                alt={song.name}
                className="w-10 h-10 object-cover rounded-md"
              />
              <div>
                <p className="font-bold">{song.name}</p>
                <p>{song.artist.name}</p>
              </div>
            </div>
          </div>
        ))}
        {queue.length === 0 && (
          <p className="text-center mt-4">No songs in queue</p>
        )}
        {queue.length > 0 && (
          <button
            className="w-full h-10 bg-green-500 text-white font-semibold rounded-md mt-4"
            onClick={clearQueue}
          >
            Clear Queue
          </button>
        )}
      </div>
    </div>
  );
};

export default Queue;
