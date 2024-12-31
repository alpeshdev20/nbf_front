
//* Importing Component
import React from "react";

import PrivacyPolicyPage from "./PrivacyPolicyPage";
// Metdadata
import { Metadata } from "next";

//* Metadata
export const metadata: Metadata = {
  title: "Privacy Policy - NetbookFlix: Protecting Your Data",
  description: "Read NetbookFlix’s Privacy Policy to learn how we collect, use, and protect your personal information and ensure secure data handling.",
};
export default function PrivacyPolicy() {
 
  return (
    <>
        <PrivacyPolicyPage />
    </>
  );
}
