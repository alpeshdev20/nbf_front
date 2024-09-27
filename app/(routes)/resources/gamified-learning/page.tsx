"use client";

import React, { useState } from "react";
import ResourcesLayout from "../resource-layout";
import { useSession } from "@/providers/SessionProvider"; // Make sure this path is correct
import DefaultResourceImage from "@/images/common/recommendation.png";

const GamifiedLearning = () => {
  const { session } = useSession(); // Get session context
  const [showGame, setShowGame] = useState(false);

  const handleShowGame = () => {
    setShowGame(true);
  };

  return (
    <ResourcesLayout>
      <div className="game-container">
        {session.isLoggedIn ? ( // Check if user is logged in
          <>
            {!showGame && (
              <button className="start-game-btn" onClick={handleShowGame}>
                Start Feed the Bee Game
              </button>
            )}
            {showGame && (
              <iframe
                src="/feedthebee/index.html"
                style={{ width: "100%", height: "500px", border: "none" }}
                title="Feed the Bee Game"
              ></iframe>
            )}
          </>
        ) : (
          <div className="login-prompt">
            <p>You need to be logged in to access the Gamified Learning feature.</p>
            <a href="/log-in" className="login-link">Log In</a>
          </div>
        )}
      </div>

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
          background-color: #5044ac;
        }

        .start-game-btn:focus {
          outline: none;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
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
