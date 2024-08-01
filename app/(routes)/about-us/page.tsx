//* Importing Component
import React from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";

//* image
import AboutImage from "@/public/images/about-us/banner.png";
import MissionImage from "@/public/images/about-us/mission.png";

export default function NotFound() {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      {/* About  */}
      <div className="about-section">
        <div className="about-image">
          <Image src={AboutImage} alt="About Image" />
        </div>
        <div className="about-content-container">
          <div className="app-container">
            <h4>
              About <span>Us</span>
            </h4>


            <div className="about-content">
              <h5>WHAT IS NETBOOKFLIX?</h5>
              <h6>NETBOOKFLIX is AI POWERED Platform for learning resources delivering access to:</h6>
              <ul>
                <li>eBooks, class notes, videos, audio books & Gamified content</li>
                <li>AI generated TOPICAL READING and Research using vast library of 05 million+ Credible sources</li>
              </ul>
            </div>


            <div className="about-content">
              <h5>VISION Statement for NETBOOKFLIX</h5>
              <ul>
                <li>To become leading provider of high-quality, affordable & inclusive educational content delivered seamlessly to learners across the globe</li>
              </ul>
            </div>



          </div>
        </div>

        <div className="about-punchline-section">
          <div className="app-container">
            <div className="about-punchline-container">
              <h4>PUNCHLINE for NETBOOKFLIX <span>" Stream unlimited knowledge "</span></h4>
            </div>
          </div>
        </div>


        <div className="mission-statement-section">
          <div className="mission-statement-container">
            <div className="mission-image">
              <Image src={MissionImage} alt="Mission Image" />
            </div>
            <div className="mission-content">
              <div className="mission-statement">
                <h5>MISSION Statement</h5>
                <p>Our mission at Netbookflix is to provide our customers with:</p>
                <ul>
                  <li>Inspire and empower our users to acquire new skills, expand their knowledge, and achieve their personal and professional goals.</li>
                  <li>Strive to make education accessible to all</li>
                  <li>Committed to providing a diverse range of content that represents different perspectives and cultures while maintaining a safe and inclusive environment for our community.</li>
                </ul>
                <p>At Netbookflix, we aim to be a leader in the education industry by pushing boundaries and innovating new ways to bring joy to our subscribers."</p>
              </div>
              <div className="values-container">
                <h6>Values</h6>
                <h4>BRAVE &</h4>
                <h4>IMAGINATIVE</h4>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
}
