//* importing components
import React from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Image from "next/image";

//* Importing Images
import Banner from "@/images/universities/banner.png";
import UniversityIcon from "@/images/universities/university-icon.png";
import UniversityAchievedImage from "@/images/universities/achives-bg.png";
import UniversityPressBG from "@/images/universities/universities-press-bg.png";
import UniversityAchivedIcon1 from "@/images/universities/achieves-1.png";
import UniversityAchivedIcon2 from "@/images/universities/achieves-2.png";
import UniversityAchivedIcon3 from "@/images/universities/achieves-3.png";
import UniversityAchivedIcon4 from "@/images/universities/achieves-4.png";
import UniversityAchivedIcon5 from "@/images/universities/achieves-5.png";
import UniversityAchivedIcon6 from "@/images/universities/achieves-6.png";

const UniversityPublishingServices = () => {
  return (
    <>
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      {/* Banner section  */}
      <section className="publishing-service-banner-section">
        <div className="publishing-service-banner-container">
          <div className="publishing-service-banner-image">
            <Image src={Banner} alt="Universites banner" priority />
          </div>
          <div className="publishing-service-banner-content">
            <h3>Three step rationale to</h3>
            <h3>University Press story:</h3>
            <p>
              India’s recognition in west providing highly educated successful
              CEO’s & Tech professionals
            </p>
            <p>
              Migration of 1 million students to west for pursuing Ivy HE brand
              & Foreign Universities set up campus in India
            </p>
            <p>
              Our ability to attract global students for Education Tourism like
              Medical Tourism
            </p>
          </div>
        </div>
      </section>

      {/* Data POints  */}
      <section className="publishing-service-data-points-section">
        <div className="app-container">
          <h5>DATA POINTS:</h5>
          <div className="publishing-service-data-points-content-container">
            <ul className="publishing-service-data-ponts">
              <li>
                India estimated to loose over US$80 billion each year on FOREX
                reserves by 2024 due to Indian students studying abroad
              </li>
              <li>
                Close to 1 million students pursuing higher education abroad.
              </li>
              <li>
                All 8 Ivy-League Universities have their own Publishing units or
                University Presses.They contribute significantly to the
                Institute global Branding, Recognition and the dissemination of
                Knowledge & Research
              </li>
              <li>
                Foreign universities to set up campuses in India. NITI Aayog
                eyeing half a million foreign students by 2047
              </li>
              <li>
                As Indian professionals are doing exceptionally well, the
                respect & demand for Indian education is increasing…
              </li>
            </ul>
          </div>
        </div>

        <div className="app-container">
          <div className="about-university-container">
            <div className="about-university-container-image">
              <Image
                src={UniversityPressBG}
                alt="University Press Banner"
                priority
              />
            </div>

            <div className="about-university-info">
              <div className="about-university-icon">
                <Image src={UniversityIcon} alt="University Icon" />
              </div>

              <div className="about-university-heading">
                <h5>ABOUT UNIVERSITY PRESS</h5>
                <p>PUBLISHING SERVICES (UPPS)</p>
              </div>

              <div className="about-university-content">
                <p>
                  UPPS is founded by senior professional with global experience
                  from Publishing industry with a vision to help South Asian
                  universities develop a strong Book Plus Publishing program.
                </p>
              </div>

              <div className="about-university-points-container">
                <div className="about-university-points">
                  <p>
                    The program aims to create a Publishing Excellence under BOT
                    (Build, Operate, Transfer) Model
                  </p>
                </div>

                <div className="about-university-points">
                  <p>
                    The organisation provides a experienced Publishing team to
                    partner universities on a sharing basis to incubate and
                    consult an independent Publishing unit
                  </p>
                </div>

                <div className="about-university-points">
                  <p>
                    The organisation provides end to end services to partner
                    universities around stragetic Publishing vision, editorial
                    marketing, branding,technology & sales outreach
                  </p>
                </div>

                <div className="about-university-points">
                  <p>
                    It’s mission is to partner globally to provide an equal
                    opportunity to potential authors from Indian subcontinent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our offerings  */}

      <section className="offering-section">
        <div className="app-container">
          <div className="offering-container">
            <h5>OUR OFFERINGS</h5>
            <p>
              Create a Publishing unit for Universities & School Groups by
              engaging both Faculty & research students
            </p>
            <p>
              Program can assist partner University & School Groups in their
              journey & recognition as a Global brand in Mid & long term
            </p>
          </div>
        </div>
      </section>

      {/* Universites Achieves  */}
      <section className="universites-achieved-sections">
        <div className="app-container">
          <div className="universites-achieved-container">
            <div className="universites-achieved-image">
              <Image
                src={UniversityAchievedImage}
                alt="University Achieved Image"
              />
            </div>
            <div className="universites-achieved-content-container">
              <h4>WHAT DO UNIVERSITIES ACHIEVE?</h4>

              <div className="universites-achieved-content">
                <div className="universites-achieved-content-card">
                  <div className="universites-achieved-content-card-image">
                    <Image src={UniversityAchivedIcon1} alt="Perception Icon" />
                  </div>

                  <div className="universites-achieved-content-card-content">
                    <p>
                      Perception as University promoting Innovation, Research &
                      Publishing of quality content
                    </p>
                  </div>
                </div>

                <div className="universites-achieved-content-card">
                  <div className="universites-achieved-content-card-image">
                    <Image
                      src={UniversityAchivedIcon2}
                      alt="Global Publishing benchmark & Recognition Icon"
                    />
                  </div>

                  <div className="universites-achieved-content-card-content">
                    <p>
                      Global Publishing benchmark & Recognition of faculty &
                      university brand building at a fraction of a cost
                    </p>
                  </div>
                </div>

                <div className="universites-achieved-content-card">
                  <div className="universites-achieved-content-card-image">
                    <Image src={UniversityAchivedIcon3} alt="Transform Icon" />
                  </div>

                  <div className="universites-achieved-content-card-content">
                    <p>
                      Opportunity to Transform & implement a strong faculty
                      engagement, motivation, upgradation & promotion program
                    </p>
                  </div>
                </div>

                <div className="universites-achieved-content-card">
                  <div className="universites-achieved-content-card-image">
                    <Image
                      src={UniversityAchivedIcon4}
                      alt="renowned Author Icon"
                    />
                  </div>

                  <div className="universites-achieved-content-card-content">
                    <p>
                      Recognition as renowned Author help university faculty
                      securing quality consulting & research projects from the
                      industry
                    </p>
                  </div>
                </div>

                <div className="universites-achieved-content-card">
                  <div className="universites-achieved-content-card-image">
                    <Image
                      src={UniversityAchivedIcon5}
                      alt="Stronger faculty- industry interaction Icon"
                    />
                  </div>

                  <div className="universites-achieved-content-card-content">
                    <p>
                      Stronger faculty- industry interaction to develop real
                      world business cases, models, prototype Autobiography
                    </p>
                  </div>
                </div>

                <div className="universites-achieved-content-card">
                  <div className="universites-achieved-content-card-image">
                    <Image
                      src={UniversityAchivedIcon6}
                      alt="revenue model Icon"
                    />
                  </div>

                  <div className="universites-achieved-content-card-content">
                    <p>Create an alternative royalty based revenue model</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default UniversityPublishingServices;
