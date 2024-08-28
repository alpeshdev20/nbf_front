"use client";

//* IMmporting components
import React from "react";
import { useSession } from "@/providers/SessionProvider";
import Link from "next/link";
import Image from "next/image";

//* Importing Image
import FreeTrail from "@/icons/free-trial.png";
import Banner from "@/images/home/banner.png";

//* importing Icons
import { FaSearch } from "react-icons/fa";

const HomeHero = () => {
  //* Session Values
  const { session, isLoading } = useSession();
  
  return (
    <section className="home-banner-section">
      <div className="home-banner-container">
        <div className="app-container">
          <div className="home-banner-content">
            <h2>STREAM UNLIMITED</h2>
            <h6>KNOWLEDGE</h6>
            <p>
              <b>READ TOPICALLY</b> from collection of over 05 million+ pages
            </p>
            <p>
              of credible content. <b>TRUSTED</b> by students worldwide.
            </p>
            <div className="home-ai-search">
              <div className="home-ai-search-addon">
                <span>AI Search</span>
              </div>
              <div className="home-ai-search-input">
                <input
                  type="search"
                  name="ai-search"
                  id="ai-search"
                  className="form-input"
                  placeholder="Type your search here"
                />
              </div>
              <div className="home-ai-search-icon">
                <FaSearch />
              </div>
            </div>
            <p>Anywhere, Anytime</p>
            {!isLoading && !session?.isLoggedIn && (
              <>
                <Link href="/sign-up">
                  <Image
                    src={FreeTrail}
                    width={351}
                    height={158}
                    priority
                    alt="Free Trail image"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="home-banner-image">
          <Image src={Banner} alt="Banner" priority />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
