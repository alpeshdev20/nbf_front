"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./CheckNewUserBanner.module.css";
import bannerImage from "@/public/images/navratri-banner.jpg";

const CheckNewUserBanner = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newUser = localStorage.getItem("new_user") === "true";
      if (newUser) {
        setIsNewUser(true);
        setShowModal(true); // Open the modal if the user is new
      }
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("new_user", "false"); // Mark the user as not new
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>

        {/* Banner Image */}
        <Image
          src={bannerImage}
          alt="Navratri Quiz Banner"
          className={styles.bannerImage}
        />
      </div>
    </div>
  );
};

export default CheckNewUserBanner;
