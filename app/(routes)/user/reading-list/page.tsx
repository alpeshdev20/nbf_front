"use client";

//* Compoonents
import React, { useEffect, useState } from "react";
import UserLayout from "../user-layout";
import WishListAndLibraryResourceCard from "@/components/Resources/WishListAndLibraryResourceCard/WishListAndLibraryResourceCard";
import {
  getUsersLibrary,
  getUsersReadingList,
  joinReadingListWithToken,
} from "@/services/resources";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ResourceCardLoader from "@/components/Resources/ResourceCardLoader/ResourceCardLoader";
import { errorToast, successToast } from "@/utils/toast_helper";
import "./ReadingList.css";
//* Icons
import LibraryIcon from "@/icons/library.png";

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";
import ReadingListResourceCard from "@/components/Resources/ReadingListResourceCard/ReadingListResourceCard";

const Library = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const { libraryData, isLoading } = getUsersReadingList(userId);

  useEffect(() => {
    // This runs only on the client side after the component mounts
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId);

    if (storedUserId) {
      fetchLibraryData(storedUserId);
    }
  }, []);
  //handle join
  const handleJoinToken = async () => {
    if (!token || !userId) {
      errorToast("Token or User ID is missing.");
      return;
    }

    try {
      const response = await joinReadingListWithToken({
        token,
        user_id: userId,
      });
      successToast(response.message || "Successfully joined the reading list!");
    } catch (err) {
      errorToast("Something went wrong. please try again later.");
    }
  };

  //get reading list dat
  const fetchLibraryData = async (uid: string) => {
    // try {
    //   // alert("before api call")
    //   const response = await getUsersReadingList(uid); // Pass userId to API
    //   alert(JSON.stringify(libraryData, null, 2));
    //   // libraryData(response?.data || []);
    // } catch (error) {
    //   console.error("Failed to fetch reading list", error);
    // } finally {
    //   // setIsLoading(false);
    // }
  };
  return (
    <UserLayout pageTitle="User Reading List" pageIcon={LibraryIcon}>
      <div className="library-container">
        {/* Token Input for Joining */}
        <div className="token-join-section">
          <input
            type="text"
            placeholder="Enter join token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={handleJoinToken}>Join Reading List</button>
        </div>

        {/* Show Loader */}
        {isLoading ? (
          <ResourceCardLoader counter={5} />
        ) : libraryData && libraryData.length > 0 ? (
          <div className="reading-lists">
            {libraryData.map((list: any, index: number) => (
              <div key={index} className="reading-list-section">
                <div className="reading-list-header">
                  <span className="badge-teacher">👩‍🏫 Teacher's Readling List</span>
                  <h2 className="reading-list-title">{list.readingListName}</h2>
                </div>{" "}
                <div className="reading-list-items">
                  {list.items.map((item: any, idx: number) => {
                    let pageURL = "/log-in"; // Default URL
                    if (
                      item.material_type === "Videos Lectures & Video Podcast"
                    ) {
                      pageURL = `/resources/videos/${item.slug}`;
                    } else if (item.material_type === "Class Notes") {
                      pageURL = `/resources/class-notes/${item.slug}`;
                    } else if (
                      item.material_type === "Audio Books & Audio Podcast"
                    ) {
                      pageURL = `/resources/audio-books/${item.slug}`;
                    } else if (
                      item.material_type === "Books" ||
                      item.material_type === "e-Books"
                    ) {
                      pageURL = `/resources/books/${item.slug}`;
                    } else if (item.material_type === "Gamified Learning") {
                      pageURL = `/resources/gamified-learning/${item.slug}`;
                    }

                    return (
                      <ReadingListResourceCard
                        key={idx}
                        slug={item.slug}
                        title={item.resource_name}
                        image={item.resource_image || DefaultResourceImage}
                        author={item.author}
                        resourceType={item.material_type}
                        pageURL={pageURL} // use the correct URL here
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </UserLayout>
  );
};

export default Library;
