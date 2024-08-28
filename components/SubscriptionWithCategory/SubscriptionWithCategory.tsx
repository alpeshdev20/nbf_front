"use client";

//* Importing Component
import React, { useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import SubscriptionCategoryCard from "@/components/SubscriptionCategoryCard/SubscriptionCategoryCard";
import { useSession } from "@/providers/SessionProvider";

//* Importing Icons
import BooksIcon from "@/images/categories/books.png";
import AudioIcon from "@/images/categories/audio.png";
import VideoIcon from "@/images/categories/videos.png";
import ClassNotesIcon from "@/images/categories/class-notes.png";
import ArIcon from "@/images/categories/ar.png";
import GamingIcon from "@/images/categories/gaming.png";

//* Importing Css
import Style from "@/components/SubscriptionWithCategory/SubscriptionWithCategory.module.css";
import Button from "../ui/Button/Button";

//* Importing Interface
interface SubscriptionWithCategoryInterface {
  bgType: "higher-edu" | "K12";
  icon: StaticImageData;
}

const SubscriptionWithCategory: React.FC<SubscriptionWithCategoryInterface> = ({
  bgType,
  icon,
}) => {
  const { session } = useSession();

  useEffect(() => {

  }, [session]);

  return (
    <div
      className={
        bgType === "higher-edu"
          ? Style.subscription_section
          : `${Style.subscription_section} ${Style.k12}`
      }
    >
      <div className="app-container">
        <div className={
          bgType === "higher-edu"
            ? Style.subscription_container
            : `${Style.subscription_container} ${Style.k12}`
        }>
          <div className={Style.subscription_content_container}>
            <h6>Join the community of global learners</h6>
            <h5>All in <i>one simple</i></h5>
            <h5><i>subscription</i></h5>

            <div className={Style.subscription_content}>
              <p>
                <Image src={icon} alt="Checked Icon" />
                Unlimited reading of Academic/Reference books
              </p>
              <p>
                <Image src={icon} alt="Checked Icon" />
                Video lectures from marquee authors
              </p>
              <p>
                <Image src={icon} alt="Checked Icon" />
                Collection of AR/VR to learn
              </p>
              <p>
                <Image src={icon} alt="Checked Icon" />
                Teaching class notes from faculty members
              </p>
              <p>
                <Image src={icon} alt="Checked Icon" />
                Audio books to listen and learn
              </p>
              <p>
                <Image src={icon} alt="Checked Icon" />
                Level up your knowledge with gamified learning
              </p>
            </div>

            <h6>Join Us at minimum of &#8377;15/-</h6>
            <h6> Cancel at anytime...</h6>

            {!session.isLoggedIn && <Button 
              link="/plans"
              content="Subscribe"
              btnColor="third"
              otherClass="subscription-button"
            />
            }
          </div>

          <div className={Style.subscription_categories_container}>
            <SubscriptionCategoryCard title="BOOKS" icon={BooksIcon} url="/resources/books" />
            <SubscriptionCategoryCard
              title="AUDIO BOOKS"
              icon={AudioIcon}
              url="/resources/audio-books"
            />
            <SubscriptionCategoryCard title="VIDEOS" icon={VideoIcon} url="/resources/videos" />
            <SubscriptionCategoryCard
              title="CLASS NOTES"
              icon={ClassNotesIcon}
              url="/resources/class-notes"
            />
            <SubscriptionCategoryCard title="AR / VR" icon={ArIcon} url="/resources/ar-vr" />
            <SubscriptionCategoryCard
              title="GAMIFIED LEARNING"
              icon={GamingIcon}
              url="/resources/gamified-learning"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionWithCategory;
