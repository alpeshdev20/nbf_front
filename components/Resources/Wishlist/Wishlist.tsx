"use client";

//* importing component
import Image from "next/image";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

//* Icons
import WishlistEmpty from "@/icons/wishlist-empty.png";
import WishlistFilled from "@/icons/wishlist.png";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

//* interface
interface WishlistInterface {
  isWishlisted: boolean;
  resourceId: string;
}

const Wishlist: React.FC<WishlistInterface> = ({
  isWishlisted,
  resourceId,
}) => {
  const queryClient = useQueryClient();

  const [wishlist, setWishlist] = useState<boolean>(isWishlisted);

  const hanldeWishlist = () => {
    post(`${process.env.API_URL}resources/wishlist/${resourceId}`)
      .then((data) => {
        if (data?.message === "REMOVED_FROM_WISHLIST") {
          errorToast("Removed from your Wishlist");
          setWishlist(false);
        } else {
          successToast("Added to your Wishlist");
          setWishlist(true);
        }
      })
      .catch((error) => {
        errorToast("something went wrong please try again later...");
      });

    queryClient.invalidateQueries({
      queryKey: [`resource-info/${resourceId}`],
    });

  };

  return (
    <>
      {wishlist && (
        <div className="resource_wishlist" onClick={hanldeWishlist}>
          <Image src={WishlistFilled} alt="Wishlist Filled Icon" />
          <p>Wishlited</p>
        </div>
      )}

      {!wishlist && (
        <div className="resource_wishlist" onClick={hanldeWishlist}>
          <Image src={WishlistEmpty} alt="Wishlist Empty Icon" />
          <p>Add to Wishlist</p>
        </div>
      )}
    </>
  );
};

export default Wishlist;
