"use client";

import React, { useState, useEffect } from "react";
import ResourcesLayout from "../../resource-layout";
import { useSession } from "@/providers/SessionProvider"; // Ensure path is correct
import ResourceDescription from "@/components/Resources/ResourceDescription/ResourceDescription";
import RelatedResources from "@/components/sliders/RelatedResources/RelatedResources";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import ResourceInfoLoader from "@/components/Resources/ResourceInfoLoader/ResourceInfoLoader";
import ShareResource from "@/components/Resources/ShareResource/ShareResource";
import Wishlist from "@/components/Resources/Wishlist/Wishlist";
import Image from "next/image";
import { FaCaretRight } from "react-icons/fa";
import DefaultResourceImage from "@/images/common/recommendation.png";
import { getResourcesInfo } from "@/services/resources";

// import images
import ResourceTypeIcon from "@/images/categories/class-card-icon.png";

const ResourceDetails = ({ params }: { params: { slug: string } }) => {
  const { session } = useSession(); // Get session context
  const [showGame, setShowGame] = useState(false);
  const { slug } = params;
    console.log("slug" ,slug);
  const handleShowGame = () => {
    setShowGame(true);
    document.body.style.overflow = "hidden"; // Disable body scrolling
  };

  const handleCloseGame = () => {
    setShowGame(false);
    document.body.style.overflow = "auto"; // Enable body scrolling
  };

  // Resource Info fetching
  const { resourceInfo, isLoading } = getResourcesInfo(slug ?? "");

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, []);

  return (
    <ResourcesLayout>
      {/* Game Modal */}
      {showGame && (
        <div className="game-modal">
          <div className="game-content">
            <button className="close-game-btn" onClick={handleCloseGame}>
              &times;
            </button>
            <iframe
                // src="/games/mcq-final/index.html"
                src={`/games/${resourceInfo.folder_name}/index.html`}

              style={{ width: "100%", height: "500px", border: "none" }}
              title="Feed the Bee Game"
            ></iframe>
          </div>
        </div>
      )}

      {/* Resource Details Section */}
      {isLoading && <ResourceInfoLoader />}
      {!isLoading && resourceInfo === null && <NoDataFound />}
      {!isLoading && resourceInfo !== null && (
        <div className="resource-info-section">
          <div className="app-container">
            <div className="resources-info-container">
              <div className="resource-info">
                <div className="resource_image_container">
                  <Wishlist
                    isWishlisted={resourceInfo.wishlist ?? false}
                    resourceId={resourceInfo.resource_id}
                  />
                  <div className="resource_image">
                    <div className="resource_icon">
                      <Image src={ResourceTypeIcon} alt="Resource Icon" />
                    </div>
                    <Image
                      src={resourceInfo.resource_image || DefaultResourceImage}
                      width={274}
                      height={421}
                      alt="Resource Image"
                    />
                  </div>
                  <ShareResource />
                </div>
                <div className="resource_content">
                  <div className="author_info">
                    <p>{resourceInfo.author}</p>
                    <h4>{resourceInfo.resource_name}</h4>
                    <div className="resource_criteria">
                      <p>
                        <FaCaretRight /> Published In {resourceInfo.year}
                      </p>
                      <p>
                        <FaCaretRight /> Copyright by {resourceInfo.publisher_name}
                      </p>
                    </div>
                  </div>

                  {/* Start Game Button in place of Read Now */}
                  {session.isLoggedIn ? (
                    <button className="start-game-btn" onClick={handleShowGame}>
                      Start Game
                    </button>
                  ) : (
                    <div className="login-prompt">
                      <p>You need to be logged in to access the Gamified Learning feature.</p>
                      <a href="/log-in" className="login-link">Log In</a>
                    </div>
                  )}
                  
                  <ul className="resource_other_info">
                    <li>Format - {resourceInfo.format}</li>
                    <li>Language - {resourceInfo.language}</li>
                    <li>Pages - {resourceInfo.length}</li>
                    <li>Product Category - {resourceInfo.genre}</li>
                  </ul>
                </div>
              </div>
            </div>
            <ResourceDescription
              summary={resourceInfo.summary ?? ""}
              toc={resourceInfo.table_of_content ?? ""}
              authorDetails={resourceInfo.author_detail ?? ""}
            />
            <RelatedResources resourceId={slug} />
          </div>
        </div>
      )}

      <style jsx>{`
        .game-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999999999;
        }

        .game-content {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 20px;
          margin-top:76px;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          width: 76%;
          position: relative;
        }

        .close-game-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          color: #5044ac;
          transition: color 0.3s ease;
        }

        .close-game-btn:hover {
          color: #d32f2f;
        }

        .start-game-btn {
          background-color: #5044ac;
          border: none;
          color: white;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 8px;
          margin-top: 20px;
          transition: background-color 0.3s ease;
        }

        .start-game-btn:hover {
          background-color: #786fb7;
        }

        .login-prompt {
          margin-top: 20px;
        }

        .login-link {
          color: #5044ac;
          font-weight: bold;
          text-decoration: underline;
        }
      `}</style>
    </ResourcesLayout>
  );
};

export default ResourceDetails;
