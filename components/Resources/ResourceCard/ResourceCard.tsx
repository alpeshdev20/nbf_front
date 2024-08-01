"use client";

//* importing Components
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Button from "@/components/ui/Button/Button";
import StarRating from "@/components/StarRating/StarRating";
import renderText from "@/utils/renderText";

//* css
import Style from "@/components/Resources/ResourceCard/ResourceCard.module.css";

//* icons
import AudioCardIcon from "@/images/categories/audio-card-icon.png";
import ARCardIcon from "@/images/categories/ar-card-icon.png";
import BookCardIcon from "@/images/categories/book-card-icon.png";
import ClassCardIcon from "@/images/categories/class-card-icon.png";
import GameCardIcon from "@/images/categories/game-card-icon.png";
import VideoCardIcon from "@/images/categories/video-card-icon.png";

//* interface
interface ResourceCardInterface {
  image: StaticImageData | string;
  url: string;
  rating: number;
  totalReviews: number;
  author: string;
  title: string;
  isUserLogin: boolean;
  // resourceType:
  // | "Books"
  // | "Audio Books"
  // | "Videos"
  // | "Class Notes"
  // | "Ar/Vr"
  // | "Gamefied";
  resourceType: string;
  relatedSliderClass?: boolean;
}

const ResourceCard: React.FC<ResourceCardInterface> = ({
  image,
  url,
  rating,
  totalReviews,
  author,
  title,
  isUserLogin,
  resourceType,
  relatedSliderClass,
}) => {
  return (
    <>
      {isUserLogin && (
        <Link
          href={url}
          className={`${Style.book_card} ${
            relatedSliderClass ? Style.related__resource : ""
          }`}
        >
          <div className={Style.book_icon}>
            {resourceType === "Audio Books" && (
              <Image src={AudioCardIcon} alt="Resource icon" priority />
            )}
            {resourceType === "Books" && (
              <Image src={BookCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Videos" && (
              <Image src={VideoCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Class Notes" && (
              <Image src={ClassCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Gamefied" && (
              <Image src={GameCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Ar/Vr" && (
              <Image src={ARCardIcon} alt="Resource icon" />
            )}
          </div>
          <div className={Style.book_image}>
            <Image src={image} alt={title} priority width={220} height={340} />
          </div>
          {rating !== 0 && (
            <div className={Style.rating_container}>
              <StarRating rating={rating} />
              <p>({totalReviews} Reviews)</p>
            </div>
          )}
          <div className={Style.book_info}>
            {author && <p>{renderText(author)}</p>}
            <h6>{renderText(title, 35)}</h6>
          </div>
        </Link>
      )}

      {!isUserLogin && (
        <div className={Style.book_card}>
          <div className={Style.book_icon}>
            {resourceType === "Audio Books" && (
              <Image src={AudioCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Books" && (
              <Image src={BookCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Videos" && (
              <Image src={VideoCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Class Notes" && (
              <Image src={ClassCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Gamefied" && (
              <Image src={GameCardIcon} alt="Resource icon" />
            )}
            {resourceType === "Ar/Vr" && (
              <Image src={ARCardIcon} alt="Resource icon" />
            )}
          </div>
          <div className={Style.book_image}>
            <Image src={image} alt={title} priority width={220} height={340} />
            <div className={Style.overlay_content}>
              <Button
                link={url}
                btnColor="primary"
                content="Start free trial"
              />
            </div>
          </div>
          {/* {rating !== 0 && (
            <div className={Style.rating_container}>
              <StarRating rating={rating} />
              <p>({totalReviews} Reviews)</p>
            </div>
          )} */}
          <div className={Style.book_info}>
            {author && <p>{renderText(author)}</p>}
            <h6>{renderText(title)}</h6>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceCard;
