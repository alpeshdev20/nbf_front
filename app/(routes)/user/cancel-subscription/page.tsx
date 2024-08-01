//* Compoonents
import React from "react";
import UserLayout from "../user-layout";

//* Icons
import LibraryIcon from "@/icons/library.png";

const CancelSubscription = () => {
  return (
    <UserLayout pageIcon={LibraryIcon} pageTitle="Cancel Subscription">
      <div>Cancel Subscription</div>
    </UserLayout>
  );
};

export default CancelSubscription;
