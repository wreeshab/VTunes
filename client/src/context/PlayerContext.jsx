import { createContext, useRef, useState, useEffect, useContext } from "react";
import { SocketContext } from "./SocketContext";
import { AuthContext } from "./AuthContext";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBackground = useRef();
  const seekBar = useRef();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  const [track, setTrack] = useState();
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minutes: 0, seconds: 0 },
    duration: { minutes: 0, seconds: 0 },
  });
  const [songDetails, setSongDetails] = useState({
    name: "",
    artist: "",
    image: "",
  });
  const [queue, setQueue] = useState([]);

  // Add songs to the queue
  const addToQueue = (songs) => {
    setQueue((prevQueue) => [...prevQueue, ...songs]);
  };

  // Clear the queue
  const clearQueue = () => {
    setQueue([]);
  };

  // Update current time and progress of the audio playback
  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        const currentTime = Math.floor(audioRef.current.currentTime);
        const duration = Math.floor(audioRef.current.duration);

        setTime({
          currentTime: {
            minutes: Math.floor(currentTime / 60),
            seconds: currentTime % 60,
          },
          duration: {
            minutes: Math.floor(duration / 60),
            seconds: duration % 60,
          },
        });

        if (seekBar.current && audioRef.current.duration) {
          const progressPercent =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          seekBar.current.style.width = `${progressPercent}%`;
        }
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("loadedmetadata", updateCurrentTime);
      audioRef.current.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          updateCurrentTime
        );
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [track, queue]); // Update effect when track or queue changes

  // Play function to start the audio playback
  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  };

  // Pause function to pause the audio playback
  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  // Emit "start-playing" event to socket when user and songDetails change
  useEffect(() => {
    if (user && songDetails && socket) {
      socket.emit("start-playing", {
        userId: user.id,
        songDetails,
      });
    }
  }, [user, songDetails, socket]);

  // Function to set a new track and play it immediately
  const setTrackAndPlay = (audioUrl, songDetails) => {
    setTrack(audioUrl); // Set the track URL
    setSongDetails(songDetails); // Set song details

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = audioUrl; // Update audio element's source
        play(); // Play the audio
      }
    }, 0);
  };

  // Seek to a specific position in the audio playback
  const seek = (e) => {
    if (audioRef.current) {
      const rect = seekBackground.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const seekTime = (offsetX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  // Handle the end of a song in the queue
  const handleSongEnd = () => {
    if (queue.length > 0) {
      // Remove the first song from the queue
      const newQueue = queue.slice(1);
      setQueue(newQueue);

      // If there is a next song, play it
      if (newQueue.length > 0) {
        setSongDetails({
          name: newQueue[0].name,
          artist: newQueue[0].artist.name,
          image: newQueue[0].thumbnailUrl,
        });
        setTrackAndPlay(newQueue[0].audioUrl, {
          name: newQueue[0].name,
          artist: newQueue[0].artist.name,
          image: newQueue[0].thumbnailUrl,
        });
      } else {
        // If the queue is empty, stop the player
        setTrack(null);
        setPlayerStatus(false);
      }
    }
  };

  // Context value to be provided to consumers
  const contextValue = {
    audioRef,
    seekBackground,
    seekBar,
    seek,
    track,
    setTrackAndPlay,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    songDetails,
    setSongDetails,
    queue,
    setQueue,
    addToQueue,
    clearQueue,
  };

  // Provide the context value to children components
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
export { PlayerContext };
