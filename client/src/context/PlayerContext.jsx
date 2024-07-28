import { createContext, useRef, useState, useEffect, useContext } from "react";
import { SocketContext } from "./SocketContext";
import { AuthContext } from "./AuthContext";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBackground = useRef();
  const seekBar = useRef();
  // console.log(useRef());
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  const [track, setTrack] = useState(null);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { minutes: 0, seconds: 0 },
    duration: { minutes: 0, seconds: 0 },
  });
  const [songDetails, setSongDetails] = useState({
    name: "",
    artist: "",
    image: "",
    lyrics: "",
    djMode: "",
  });
  const [queue, setQueue] = useState([]);

  const addToQueue = (songs) => {
    setQueue((prevQueue) => {
      const newQueue = [...prevQueue, ...songs];
      if (!track && newQueue.length > 0) {
        playNextSong(newQueue, 0);
      }
      return newQueue;
    });
  };

  const clearQueue = () => setQueue([]);

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", user.id);
      socket.on("play", handlePlay);
      socket.on("pause", handlePause);
      socket.on("seek", handleSeek);
      socket.on("track-change", handleTrackChange);

      return () => {
        socket.emit("leave-room", user.id);
        socket.off("play", handlePlay);
        socket.off("pause", handlePause);
        socket.off("seek", handleSeek);
        socket.off("track-change", handleTrackChange);
      };
    }
  }, [socket]);

  const handlePlay = () => playForSocket();
  const handlePause = () => pauseForSocket();
  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };
  const handleTrackChange = ({ audioUrl, songDetails }) => {
    setTrackAndPlayForSocket(audioUrl, songDetails);
  };

  const playForSocket = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayerStatus(true);
    }
  };
  const pauseForSocket = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayerStatus(false);
    }
  };

  const setTrackAndPlayForSocket = (audioUrl, songDetails) => {
    setTrack(audioUrl);
    setSongDetails(songDetails);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        play();
      }
    }, 25);
  };

  const play = () => {
    audioRef.current.play();
    setPlayerStatus(true);
    if (user && socket) {
      socket.emit("play", user.id);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayerStatus(false);
    if (user && socket) {
      socket.emit("pause", user.id);
    }
  };

  const setTrackAndPlay = (audioUrl, songDetails) => {
    setTrack(audioUrl);
    setSongDetails(songDetails);
    // i have no idea why without the timeout its not working, probably there's some delay in the audio loading.
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        play();
      }
      if (user && socket) {
        socket.emit("track-change", { userId: user.id, audioUrl, songDetails });
      }
    }, 25);
  };

  const shuffleQueue = () => {
    setQueue((prevQueue) => {
      const shuffledQueue = [...prevQueue];
      for (let i = shuffledQueue.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQueue[i], shuffledQueue[j]] = [
          shuffledQueue[j],
          shuffledQueue[i],
        ];
      }
      return shuffledQueue;
    });
  };

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
  }, [track, queue]);

  useEffect(() => {
    if (user && songDetails && socket) {
      socket.emit("start-playing", {
        userId: user.id,
        songDetails,
      });
    }
  }, [user, songDetails, socket]);

  const goToDjBeatDrop = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = songDetails.djMode;
      if (user && socket) {
        socket.emit("seek", user.id, songDetails.djMode);
      }
    }
  };

  const seek = (e) => {
    if (audioRef.current) {
      const rect = seekBackground.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const seekTime = (offsetX / rect.width) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;

      if (user && socket) {
        socket.emit("seek", user.id, seekTime);
      }
    }
  };

  const handleSongEnd = () => {
    if (queue.length > 0) {
      playNextSong(queue, 0);
    } else {
      setTrack(null);
      setPlayerStatus(false);
    }
  };

  const playNextSong = (queue, index) => {
    if (index < queue.length) {
      const nextSong = queue[index];
      const songDetails = {
        name: nextSong.name,
        artist: nextSong.artist.name,
        image: nextSong.thumbnailUrl,
        lyrics: nextSong.lyrics ? nextSong.lyrics : "",
        djMode: nextSong.djMode ? nextSong.djMode : 0,
      };
      setTrackAndPlay(nextSong.audioUrl, songDetails);
    }
  };

  const playNext = () => {
    const currentIndex = queue.findIndex((song) => song.audioUrl === track);
    if (currentIndex < queue.length - 1) {
      playNextSong(queue, currentIndex + 1);
    } else {
      playNextSong(queue, 0);
    }
  };

  const playPrevious = () => {
    const currentIndex = queue.findIndex((song) => song.audioUrl === track);
    if (currentIndex > 0) {
      playNextSong(queue, currentIndex - 1);
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
    goToDjBeatDrop,
    playNext,
    playPrevious,
    shuffleQueue,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
export { PlayerContext };
