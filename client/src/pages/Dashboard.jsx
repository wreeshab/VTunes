import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import TrackBar from '../components/TrackBar';
import MainDisplay from '../components/MainDisplay';
import { PlayerContext } from '../context/PlayerContext';

const Dashboard = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className='h-screen w-screen bg-white'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <MainDisplay />
      </div>
      <TrackBar />
      <audio ref={audioRef} src={track} preload='auto' />
    </div>
  );
};

export default Dashboard;
