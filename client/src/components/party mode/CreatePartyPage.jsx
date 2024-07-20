import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { url } from "../../data/backenUrl";

const CreatePartyPage = () => {
  const [partyName, setPartyName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateParty = async () => {
    if (!partyName) {
      toast.error("Please enter a party name");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${url}/party/create-party-room`,
        { name: partyName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setPartyName("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create party room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-full flex flex-col items-center p-5 bg-gray-700 text-teal-200">
      <h1 className="text-5xl font-bold mb-5">Create Party Room</h1>
      <input
        type="text"
        value={partyName}
        onChange={(e) => setPartyName(e.target.value)}
        placeholder="Party Name"
        className="p-2 rounded bg-gray-700 border border-gray-600 text-white mb-4"
      />
      <button
        onClick={handleCreateParty}
        className="p-2 rounded bg-teal-500 hover:bg-teal-600 text-white font-bold"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Party"}
      </button>
      <ToastContainer />
    </div>
  );
};

export default CreatePartyPage;
