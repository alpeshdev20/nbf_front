"use client";

//* importing components
import React, { useEffect, useState } from "react";

import dynamic from 'next/dynamic'
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

import "plyr-react/plyr.css";

//* interface
interface AudioPlayerInterface {
  resource: string;
  format: string;
}

//* css
// import Style from "@/components/Players/AudioPlayer/AudioPlayer.module.css";

const AudioPlayer: React.FC<AudioPlayerInterface> = ({ resource, format }) => {

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
