import PartyRoom from "../../models/PartyRoom.js";

const createPartyRoom = async (req, res) => {
  const { name } = req.body;
  const host = req.userID.id;

  if (!name) {
    return res.status(400).json({ message: "Party room name is required" });
  }

  try {
    const newPartyRoom = new PartyRoom({ name, host, members: [host] });
    await newPartyRoom.save();
    res.status(201).json({
      message: "Party room created successfully",
      partyRoom: newPartyRoom,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default createPartyRoom;
