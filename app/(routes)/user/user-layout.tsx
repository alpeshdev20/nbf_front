"use client";
//* Importing Component
import React, { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import ResourcesTabs from "@/components/Resources/ResourcesTabs/ResourcesTabs";
import UserSidebar from "@/components/UserSidebar/UserSidebar";
import Button from "@/components/ui/Button/Button";
import Image, { StaticImageData } from "next/image";
import { getProfile } from "@/services/profile";

//* interface
interface UserLayoutInterface {
  children: ReactNode;
  pageTitle: string;
  pageIcon: StaticImageData;
}

const UserLayout: React.FC<UserLayoutInterface> = ({
  children,
  pageTitle,
  pageIcon,
}) => {
  const { profile, isSuccess, isLoading } = getProfile();

  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      <ResourcesTabs />

      <div className="user-portal-section">
        <div className="app-container">
          <div className="user-portal-container">
            <UserSidebar />

            <div className="user-page">
              <div className="user-welcome-section">
                <div className="user-welcome-note">
                  <h5>Hi! {profile?.name}</h5>
                  <p>
                    <b>Welcome</b> to <span>NETBOOKFLIX!</span>
                  </p>
                  <p>
                    Where your satisfaction is our priority, and excellence is
                    our commitment!
                  </p>
                </div>

                <div className="user-subscription-info">
                  {profile?.remaning_days !== 0 && (
                    <h6>Active Plan : {profile?.plan}</h6>
                  )}
                  <div className="user-change-plan">
                    {!isLoading && isSuccess && (
                      <h3>
                        {profile?.remaning_days !== 0
                          ? `${profile?.remaning_days} Days Left!`
                          : "Plan Expired"}
                      </h3>
                    )}
                    <Button
                      content="Change Plan"
                      btnColor="primary"
                      link="/plans"
                      otherClass="change-plan"
                    />
                  </div>
                </div>
              </div>

              <div className="user-page-header">
                <div className="user-page-icon">
                  <Image src={pageIcon} alt={pageTitle} />
                </div>

                <div className="user-page-title">
                  <h4>{pageTitle}</h4>
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default UserLayout;
