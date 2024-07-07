import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SearchCard from "./SearchCard";
import { url } from "../data/backenUrl";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("users");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(`${url}/search`, {
          params: { query, type },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setResults(response.data.results);
        console.log("results- ", response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [query, type]);

  return (
    <div className="p-4 min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-4 rounded-xl bg-teal-700 text-white focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex justify-around mt-4 text-gray-100">
          <button
            className={`px-4 py-2 rounded-xl ${
              type === "users" ? "bg-blue-800" : "bg-gray-700"
            }`}
            onClick={() => setType("users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${
              type === "music" ? "bg-blue-800" : "bg-gray-700"
            }`}
            onClick={() => setType("music")}
          >
            Music
          </button>
          <button
            className={`px-4 py-2 rounded-xl ${
              type === "artists" ? "bg-blue-800" : "bg-gray-700"
            }`}
            onClick={() => setType("artists")}
          >
            Artists
          </button>
        </div>
        <div className="mt-8 items-center flex flex-col gap-2">
          {/* {results.map((result, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded mb-4">
              {type === "users" && <p>User: {result.name}</p>}
              {type === "music" && <p>Song: {result.name}</p>}
              {type === "artists" && <p>Artist: {result.name}</p>}
            </div>
          ))} */}
          {results.map((object, index) => (
            <SearchCard key={index} object={object} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
