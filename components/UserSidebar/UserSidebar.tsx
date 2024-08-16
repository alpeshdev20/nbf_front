"use client";

//* components
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";
import { errorToast, successToast } from "@/utils/toast_helper";
import { post } from "@/utils/fetch";
import { useQueryClient } from "@tanstack/react-query";

//* css
import Style from "@/components/UserSidebar/UserSidebar.module.css";

//* Image
import UserIcon from "@/icons/user.png";
import { MdOutlineArrowRight } from "react-icons/md";

const UserSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const queryClient = useQueryClient();

  const { setSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);


   // Handle cancel subscription function
   const handleCancelSubscription = () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      errorToast("User ID not found.");
      return;
    }

    setIsLoading(true);
    post(`${process.env.API_URL}user/cancel-subscription/${user_id}`, {})
      .then((response) => { 
        if (response.status === 200) {
          successToast("Subscription canceled successfully.");
          router.push("/"); // Redirect to homepage or another page
        } else {
          errorToast("Failed to cancel subscription, please try again later...");
        }
      })
      .catch(() => {
        errorToast("Failed to cancel subscription, please try again later...");
      })
      .finally(() => {
          (false);
      });
  };

  const handleConfirmCancel = () => {
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      handleCancelSubscription();
    }
  };

  const signOutUser = () => {
    post(`${process.env.API_URL}user/sign-out`, {})
      .then((data) => {
        if (data.status === 200) {
          const user_id = localStorage.getItem("user_id");
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("user_id");
          setSession({
            isLoggedIn: false,
            user: {
              name: "",
              user_id: "",
              token: "",
            },
          });

          // router.push(`/feedback?id=${user_id}`);
          router.push("/");
          successToast("Logout successfully");
        } else {
          errorToast("something went wrong please try again later...");
        }
      })
      .catch(() => {
        errorToast("something went wrong please try again later...");
      });

    queryClient.invalidateQueries({
      queryKey: ["user_profile"],
    });
  };

  return (
    <div className={Style.sidebar}>
      <div className={Style.sidebar_container}>
        {/* <div className={Style.user_profile}>
          <div className={Style.user_image}>
            <Image src={UserIcon} width={175} height={175} alt="User Profile" />
          </div>
          <div className={Style.user_image_actions}>
            <p>Update Picture</p>
          </div>
        </div> */}

        <div className={Style.sidebar_menus_container}>
          <div
            className={
              pathname.includes("/user/profile")
                ? `${Style.sidebar_menus} ${Style.menu_active}`
                : Style.sidebar_menus
            }
          >
            <Link href="/user/profile">
              Personal Information <MdOutlineArrowRight />
            </Link>
          </div>
          {/* <div
            className={
              pathname.includes("/user/payment-hisory")
                ? `${Style.sidebar_menus} ${Style.menu_active}`
                : Style.sidebar_menus
            }
          >
            <Link href="/user/payment-hisory">
              Payment History <MdOutlineArrowRight />
            </Link>
          </div> */}
          <div
            className={
              pathname.includes("/user/wishlists")
                ? `${Style.sidebar_menus} ${Style.menu_active}`
                : Style.sidebar_menus
            }
          >
            <Link href="/user/wishlists">
              Wishlist <MdOutlineArrowRight />
            </Link>
          </div>
          <div
            className={
              pathname.includes("/user/library")
                ? `${Style.sidebar_menus} ${Style.menu_active}`
                : Style.sidebar_menus
            }
          >
            <Link href="/user/library">
              Library <MdOutlineArrowRight />
            </Link>
          </div>

          <div
            className={
              pathname.includes("/user/change-password")
                ? `${Style.sidebar_menus} ${Style.menu_active}`
                : Style.sidebar_menus
            }
          >
            <Link href="/user/change-password">
              Security <MdOutlineArrowRight />
            </Link>
          </div>

          <div className={Style.sidebar_menus}>
            <p onClick={signOutUser}>Sign Out</p>
          </div>

        </div>
        <div className={Style.sidebar_menus}>
          {/* <Link href="/user/cancel-subscription">Cancel Subscription</Link> */}
          <p onClick={handleConfirmCancel}>Cancel Subscription</p>
          {/* <button
            onClick={handleConfirmCancel}
            className={Style.cancel_subscription_button}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Cancel Subscription"}
          </button> */}
        </div>
       
      </div>
    </div>
  );
};

export default UserSidebar;
