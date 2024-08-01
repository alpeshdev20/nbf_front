"use client";

//* importing Components
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Button from "@/components/ui/Button/Button";
import StarRating from "@/components/StarRating/StarRating";

//* css
import Style from "@/components/Resources/NaisaSearchCard/NaisaSearchCard.module.css";

//* icons
import AudioCardIcon from "@/images/categories/audio-card-icon.png";
import ARCardIcon from "@/images/categories/ar-card-icon.png";
import BookCardIcon from "@/images/categories/book-card-icon.png";
import ClassCardIcon from "@/images/categories/class-card-icon.png";
import GameCardIcon from "@/images/categories/game-card-icon.png";
import VideoCardIcon from "@/images/categories/video-card-icon.png";

//* interface
interface NaisaSearchCardInterface {
  image: StaticImageData;
  rating: number;
  totalReviews?: number;
  author: string;
  title: string;
  resourceType:
    | "Books"
    | "Audio Books"
    | "Videos"
    | "Class Notes"
    | "Ar/Vr"
    | "Gamefied";
  resourceUrl: string;
  btnContext: string;
}

const NaisaSearchCard: React.FC<NaisaSearchCardInterface> = ({
  image,
  rating,
  totalReviews,
  author,
  title,
  resourceType,
  resourceUrl,
  btnContext,
}) => {
  return (
    <>
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
          <Image src={image} alt={title} />
        </div>
        <div className={Style.rating_container}>
          <StarRating rating={rating} />

          <p>({totalReviews} Reviews)</p>
        </div>
        <div className={Style.book_info}>
          <p>{author}</p>
          <h6>{title}</h6>

          <Button
            link={resourceUrl}
            btnColor="primary"
            content={btnContext}
            otherClass={Style.naisa_search_button}
          />
        </div>
      </div>
    </>
  );
};

export default NaisaSearchCard;
