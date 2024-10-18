"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/providers/SessionProvider";

//* Importing Image
import FreeTrail from "@/icons/free-trail-k12.png";
import Banner from "@/images/k12/banner.jpg";

//* importing Icons
import { FaSearch } from "react-icons/fa";

const K12Hero = () => {
  //* Session Values
  const { session, isLoading } = useSession();

  return (
    <section className="k12-banner-section">
      <div className="k12-banner-container">
        <div className="app-container">
          <div className="k12-banner-content">
            <h4>EMPOWER LEARNING;</h4>
            <h3>OVERCOME FEAR</h3>
            <p>NOW, ASK UNLIMITED QUESTIONS WITH</p>
            <p>
              <b>OUR AI ASSISTANT</b>
            </p>
            <div className="k12-ai-search">
              <div className="k12-ai-search-addon">
                <span>AI Search</span>
              </div>
              <div className="k12-ai-search-input">
                <input
                  type="search"
                  name="ai-search"
                  id="ai-search"
                  className="form-input"
                  placeholder="Search from our collection"
                />
              </div>
              <div className="k12-ai-search-icon">
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
        <div className="k12-banner-image">
          <Image src={Banner} alt="Banner" priority />
        </div>
      </div>
    </section>
  );
};

export default K12Hero;
