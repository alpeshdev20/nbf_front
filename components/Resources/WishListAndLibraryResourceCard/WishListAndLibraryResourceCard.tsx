"use client";

//* importing Components
import React from "react";
import Image, { StaticImageData } from "next/image";
import Button from "@/components/ui/Button/Button";
// import StarRating from "@/components/StarRating/StarRating";
import { useQueryClient } from "@tanstack/react-query";
import { post } from "@/utils/fetch";
import { errorToast } from "@/utils/toast_helper";
import renderText from "@/utils/renderText";

//* css
import Style from "@/components/Resources/WishListAndLibraryResourceCard/WishListAndLibraryResourceCard.module.css";

//* icons
import AudioCardIcon from "@/images/categories/audio-card-icon.png";
import ARCardIcon from "@/images/categories/ar-card-icon.png";
import BookCardIcon from "@/images/categories/book-card-icon.png";
import ClassCardIcon from "@/images/categories/class-card-icon.png";
import GameCardIcon from "@/images/categories/game-card-icon.png";
import VideoCardIcon from "@/images/categories/video-card-icon.png";


//* interface
interface WishListAndLibraryResourceCardInterface {
  image: StaticImageData | string;
  rating: number;
  totalReviews: number;
  author: string;
  title: string;
  resourceType: string;
  pageURL: string;
  resourceId: string;
  detailContext: string;
  removeContext?: string;
}

const WishListAndLibraryResourceCard: React.FC<
  WishListAndLibraryResourceCardInterface
> = ({
  resourceId,
  image,
  rating,
  totalReviews,
  author,
  title,
  resourceType,
  pageURL,
  removeContext,
  detailContext,
}) => {
    const queryClient = useQueryClient();

    const hanldeWishlist = (resourceId: string) => {
      post(`${process.env.API_URL}resources/wishlist/${resourceId}`)
        .then((data) => {
          errorToast("Removed from your Wishlist");
        })
        .catch((error) => {
          errorToast("something went wrong please try again later...");
        });

      queryClient.invalidateQueries({
        queryKey: [`user/wishlists`],
      });
    };
    

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
            <Image src={image} alt={title} width={220} height={340} />
            <div className={Style.overlay_content}>
              <Button
                link={pageURL}
                btnColor="primary"
                content={detailContext}
                otherClass={Style.whislist_button}
              />

              {removeContext && <Button
                btnType="button"
                clickEventName={() => hanldeWishlist(resourceId)}
                btnColor="third"
                content={removeContext}
                otherClass={`${Style.remove_button} ${Style.whislist_button}`}
              />}
            </div>
          </div>
          {/* <div className={Style.rating_container}>
            <StarRating rating={rating} />

            <p>({totalReviews} Reviews)</p>
          </div> */}
          <div className={Style.book_info}>
            {author && <p>{renderText(author)}</p>}
            <h6>{renderText(title)}</h6>
          </div>
        </div>
      </>
    );
  };

export default WishListAndLibraryResourceCard;