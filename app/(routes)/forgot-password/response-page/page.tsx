"use client";

//* Importing Component
import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import { useSession } from "@/providers/SessionProvider";

//* importing images
import Logo from "@/public/logo.png";

const ResponsePage = () => {
  const params = useSearchParams();
  const router = useRouter();
  return (
    <section
      className={
        params.get("src") === "k12" ? "login-section k12" : "login-section"
      }
    >
      <div className="app-container">
        <div className="login-container">
          <div className="brand-logo">
            <Link href="/">
              <Image src={Logo} alt="Netbookflix" />
            </Link>
          </div>

          <div className="form-container reset-response-page">
            <div className="forms">
              <div className="form-success-message">
                <h6>Password</h6>
                <h6>
                  <span>Successfully</span> Updated!
                </h6>
              </div>
              <div className="form-button-container center">
                <Button
                  link={
                    params.get("src")
                      ? `/log-in?src=${params.get("src")}`
                      : "/log-in"
                  }
                  btnColor="secondary"
                  content="LOGIN"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Success = () => {
  return (
    <>
      <Suspense>
        <ResponsePage />
      </Suspense>
    </>
  );
};

export default Success;
