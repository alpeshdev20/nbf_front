"use client";

//* importing Components
import React from "react";
import { Rating } from "react-simple-star-rating";

//* css
import Style from "@/components/StarRating/StarRating.module.css";

//* interface
interface StarRatingInterface {
  rating: number;
}

const StarRating: React.FC<StarRatingInterface> = ({ rating }) => {
  return (
    <Rating
      className={Style.hide_empty_star_icons}
      initialValue={rating}
      readonly={true}
      allowFraction={false}
      onClick={function noRefCheck() {}}
    />
  );
};

export default StarRating;
