"use client";

//* importing components
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

import "plyr-react/plyr.css";

//* interface
interface AudioPlayerInterface {
  resource: string;
  format: string;
  resourceId: string;
  updateUserReadingStats: (time: string) => void;
  updateUserAndBookStats: (time: string) => void;
}

const AudioPlayer: React.FC<AudioPlayerInterface> = ({
  resource,
  resourceId,
  updateUserAndBookStats,
}) => {
  // State to track the current time of the audio
  const [currentTime, setCurrentTime] = useState(0);

  // Effect to handle periodic updates to stats
   //* Use Effect for setInterval
   useEffect(() => {
    const interval = setInterval(() => {
      updateUserAndBookStats("5000");
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Plyr
        source={{
          type: "audio",
          sources: [{ src: resource }],
        }}
        autoPlay
      />
    </>
  );
};

export default AudioPlayer;
