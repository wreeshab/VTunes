const getSongDuration = (audioUrl) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });
  });
};

export default getSongDuration;
