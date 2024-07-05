import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        logout
      </button>
    </div>
  );
};

export default ProfilePage;
