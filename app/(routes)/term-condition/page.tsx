
//* Importing Component
import React from "react";
import TermAndConditionPage from "./TermAndConditionPage";
import { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Terms and Conditions - NetbookFlix: Understand Our Policies",
  description: "Review the terms and conditions of NetbookFlix. Learn about our policies, guidelines, and user responsibilities when using our platform.",
};
export default function TermAndCondition() {

  return (
    <>
        {/* T & C  */}
        <TermAndConditionPage /> 
    </>
  );
}
