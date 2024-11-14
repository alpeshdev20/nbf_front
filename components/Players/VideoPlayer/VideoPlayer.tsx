"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr-react/plyr.css";
import Style from "@/components/Players/VideoPlayer/VideoPlayer.module.css";

interface VideoPlayerInterface {
  resource: string;
  resourceId: string;
  format: string;
  updateUserAndBookStats: (time: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerInterface> = ({
  resource,
  format,
  resourceId,
  updateUserAndBookStats,
}) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      updateUserAndBookStats("5000");
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={Style.videoPlayerContainer}>
      <div className={Style.videoPlayer}>
        <Plyr
          source={{
            type: "video",
            sources: [{ src: resource }],
          }}
          autoPlay={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
