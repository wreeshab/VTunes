import React from "react";

const PlaylistCard = ({ image, name, id }) => {
  return (
    <div
      id={id}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-lime-200 flex flex-col items-center "
    >
      <img src={image} className="mx-auto rounded w-[80%]" alt="" />
      <p className="font-bold mt-2 mb-1 text-center">{name}</p>
    </div>
  );
};

export default PlaylistCard;
