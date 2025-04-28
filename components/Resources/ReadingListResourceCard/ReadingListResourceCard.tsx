"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Button from "@/components/ui/Button/Button";
import renderText from "@/utils/renderText";

//* CSS
import Style from "@/components/Resources/WishListAndLibraryResourceCard/WishListAndLibraryResourceCard.module.css";

//* icons
import AudioCardIcon from "@/images/categories/audio-card-icon.png";
import ARCardIcon from "@/images/categories/ar-card-icon.png";
import BookCardIcon from "@/images/categories/book-card-icon.png";
import ClassCardIcon from "@/images/categories/class-card-icon.png";
import GameCardIcon from "@/images/categories/game-card-icon.png";
import VideoCardIcon from "@/images/categories/video-card-icon.png";

//* interface
interface ReadingListResourceCardInterface {
  image: StaticImageData | string;
  author: string;
  title: string;
  resourceType: string;
  pageURL: string;
  slug?: string;
}

const ReadingListResourceCard: React.FC<ReadingListResourceCardInterface> = ({
  image,
  author,
  title,
  resourceType,
  pageURL,
}) => {
  return (
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
        <Image src={image} alt={title} width={220} height={340} />
        <div className={Style.overlay_content}>
          <Button
            link={pageURL}
            btnColor="primary"
            content="View Details"
            otherClass={Style.readinglist_button}
          />
        </div>
      </div>

      <div className={Style.book_info}>
        {author && <p>{renderText(author)}</p>}
        <h6>{renderText(title)}</h6>
      </div>
    </div>
  );
};

export default ReadingListResourceCard;
