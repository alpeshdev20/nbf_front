"use client";
//* importing components
import React, { useEffect, useState } from "react";
import { isResourceRead } from '@/services/UsersStats';
import { ReactReader } from 'react-reader';


//* interface
interface EpubReaderInterface {
  resource: string;
  resourceId: string;
  updateUserReadingStats: (pageNumber: string) => void;
  updateUserAndBookStats: (time: string) => void;
}


const EpubReader: React.FC<EpubReaderInterface> = ({ resource, updateUserReadingStats, resourceId, updateUserAndBookStats }) => {
  const [location, setLocation] = useState<string>("0")


  //* Gettting user Read Stats
  const { isRead, isSuccess } = isResourceRead(resourceId ?? "");

  //* Handling userReading Stats
  const handleUserReadingStats = (epubcfi: string) => {
    setLocation(epubcfi)
    updateUserReadingStats(epubcfi);
  }

  useEffect(() => {
    if (isSuccess) {
      setLocation(isRead.page_number);
    }

    return () => {
      setLocation("0");
    }
  }, [isSuccess, isRead]);


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
      <ReactReader
        url={resource}
        epubInitOptions={{
          openAs: 'epub',
        }}

        location={location}
        locationChanged={(epubcfi: string) => handleUserReadingStats(epubcfi)}
      />
    </>
  );
};

export default EpubReader;
