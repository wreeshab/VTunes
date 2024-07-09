import { createContext, useRef, useState, useEffect, useContext } from "react";
import { SocketContext, SocketContextProvider } from "./SocketContext";


const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBackground = useRef();
  const seekBar = useRef();
  const { currentSongSoc, setCurrentSongSoc, socket } = useContext(SocketContext);

  const [track, setTrack] = useState();
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      minutes: 0,
      seconds: 0,
    },
    duration: {
      minutes: 0,
      seconds: 0,
    },
  });
  const [songDetails, setSongDetails] = useState({
    name: "",
    artist: "",
    image: "",
  });
  const [queue, setQueue] = useState([]);

  const addToQueue = (songs) => {
    setQueue((prevQueue) => [...prevQueue, ...songs]);
  };

  useEffect(() => {
    if (queue.length > 0 && (!track || track === "" || track === undefined)) {
      setSongDetails({
        name: queue[0].name,
        artist: queue[0].artist.name,
        image: queue[0].thumbnailUrl,
      });
      setTrackAndPlay(queue[0].audioUrl, {
        name: queue[0].name,
        artist: queue[0].artist.name,
        image: queue[0].thumbnailUrl,
      });
    }
  }, [queue]);

  const clearQueue = () => {
    setQueue([]);
  };


  useEffect(() => {
    const updateCurrentTime = () => {
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
  }, [track, queue]);

  // Play function to start the audio
  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
  };

  // Pause function to pause the audio
  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
  };

  // Function to set a new track and play it immediately
  const setTrackAndPlay = (audioUrl, songDetails) => {
    setTrack(audioUrl); // Set the track URL
    setSongDetails(songDetails); // Set song details
    setTimeout(() => {
      audioRef.current.src = audioUrl; // Update audio element's source
      play(); // Play the audio
    }, 0);
  };

  const seek = (e) => {
    const rect = seekBackground.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const seekTime = (offsetX / rect.width) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

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

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
export { PlayerContext };
