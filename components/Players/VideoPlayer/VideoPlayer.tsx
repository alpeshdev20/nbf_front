"use client";

//* importing components
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

import "plyr-react/plyr.css";

//* interface
interface VideoPlayerInterface {
  resource: string;
  format: string;
}

//* css
// import Style from "@/components/Players/VideoPlayer/VideoPlayer.module.css";

const VideoPlayer: React.FC<VideoPlayerInterface> = ({ resource, format }) => {

  return (
    <>
      <Plyr
        source={{
          type: "video",
          sources: [{ src: resource }],
        }}
        autoPlay={true}
      />
    </>
  );
};

export default VideoPlayer;
