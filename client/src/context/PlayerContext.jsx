import { createContext, useRef, useState, useEffect } from "react";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBackground = useRef();
  const seekBar = useRef();

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

  // Adding event listeners to update current time and duration
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
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("loadedmetadata", updateCurrentTime);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
        audioRef.current.removeEventListener("loadedmetadata", updateCurrentTime);
      }
    };
  }, [track]);

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

  const contextValue = {
    audioRef,
    seekBackground,
    seekBar,
    track,
    setTrackAndPlay, // Use the new function in the context value
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    songDetails,
    setSongDetails
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
export { PlayerContext };
