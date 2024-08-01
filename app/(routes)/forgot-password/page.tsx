"use client";

//* Importing Component
import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

//* importing images
import Logo from "@/public/logo.png";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const params = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleForm = () => {
    setLoading(true);
    post(`${process.env.API_URL}auth/user/forgot-password`, {
      email: email,
    })
      .then((data) => {
        if (data.status === 400) {
          setLoading(false);
          setError(data?.message?.email);
        } else {
          setError("");
          setEmail("");
          const link = params.get("src")
            ? `/forgot-password/verify-otp?src=${params.get("src")}&id=${
                data?.response?.id
              }`
            : `/forgot-password/verify-otp?id=${data?.response?.id}`;

          successToast(
            "We have send the verification code to your email address. Please check your inbox to retrieve the code."
          );
          router.push(link);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("");
        setEmail("");
        errorToast("something went wrong please try again later...");
      });
  };

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

          <div className="form-container">
            <h6>Forgot Your Password</h6>
            <p>
              New User?
              <b>
                <Link href="/sign-up"> Sign Up</Link>
              </b>
            </p>

            <div className="form-message">
              <p>
                Please enter the email address/ phone you'd like your password
                reset information sent to
              </p>
            </div>

            <div className="forms">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="error">{error}</div>
              </div>

              <div className="form-button-container center">
                {!loading && (
                  <Button
                    btnType="button"
                    btnColor="secondary"
                    content="GET VERIFICATION CODE"
                    clickEventName={handleForm}
                  />
                )}

                {loading && (
                  <Button
                    showLoadingButton={true}
                    btnType="button"
                    btnColor="secondary"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ForgotPassword = () => {
  return (
    <>
      <Suspense>
        <ForgotPasswordForm />
      </Suspense>
    </>
  );
};

export default ForgotPassword;
