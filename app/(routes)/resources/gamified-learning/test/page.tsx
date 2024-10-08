"use client";

import React, { useState, useEffect } from "react";
import ResourcesLayout from "../../resource-layout";
import { useSession } from "@/providers/SessionProvider"; // Ensure path is correct

const GamifiedLearning = () => {
  const { session } = useSession(); // Get session context
  const [showGame, setShowGame] = useState(false);

  const handleShowGame = () => {
    setShowGame(true);
    // Disable body scrolling when the game modal is open
    document.body.style.overflow = "hidden";
  };

  const handleCloseGame = () => {
    setShowGame(false);
    // Enable body scrolling again when the game modal is closed
    document.body.style.overflow = "auto";
  };

  // Ensure cleanup when the component is unmounted or game is closed
  useEffect(() => {
    return () => {
      // Re-enable body scrolling when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ResourcesLayout>
      <div className="game-container">
        {session.isLoggedIn ? (
          <>
            {!showGame && (
              <button className="start-game-btn" onClick={handleShowGame}>
                Start Feed the Bee Game
              </button>
            )}
          </>
        ) : (
          <div className="login-prompt">
            <p>You need to be logged in to access the Gamified Learning feature.</p>
            <a href="/log-in" className="login-link">Log In</a>
          </div>
        )}
      </div>

      {/* Game Modal */}
      {showGame && (
        <div className="game-modal">
          <div className="game-content">
            <button className="close-game-btn" onClick={handleCloseGame}>
              &times;
            </button>
            <iframe
              src="/feedthebee/index.html"
              style={{ width: "100%", height: "500px", border: "none" }}
              title="Feed the Bee Game"
            ></iframe>
          </div>
        </div>
      )}

      <style jsx>{`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
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

        .start-game-btn:focus {
          outline: none;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
        }

        /* Game Modal styles */
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
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          width: 60%;
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

export default GamifiedLearning;
