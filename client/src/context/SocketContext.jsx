import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();
const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [currentSongSoc, setCurrentSongSoc] = useState({});

  useEffect(() => {
    const setupSocket = () => {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: user.id,
        },
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setSocket(newSocket);
      //clean ups
      return newSocket;
    };

    const disconnectSocket = (socket) => {
      if (socket) {
        socket.disconnect();
      }
    };

    if (user) {
      const newSocket = setupSocket();
      console.log("Connected to socket");

      // Clean ups on unmount
      return () => {
        disconnectSocket(newSocket);
      };
    } else {
      // Cleaning up if user becomes null so that we can save sone memory
      disconnectSocket(socket);
      setSocket(null);
      setOnlineUsers([]);
      console.log("Disconnected from socket");
    }
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, currentSongSoc, setCurrentSongSoc }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
