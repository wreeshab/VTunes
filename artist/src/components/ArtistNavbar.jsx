import React, { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { ArtistAuthContext } from '../context/ArtistAuthContext';

const ArtistNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {artistLogout} = useContext(ArtistAuthContext)

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    artistLogout();
    // Handle logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="bg-gray-500 p-4 shadow-md flex justify-between items-center h-[7%]">
      <div className="text-3xl font-bold">
        DTunes Artist
      </div>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleDropdownToggle}
        >
          <FaUserCircle size={24} className="mr-2" />
          <span className="font-semibold">A</span>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistNavbar;
