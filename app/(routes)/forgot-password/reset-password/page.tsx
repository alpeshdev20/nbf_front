"use client";

//* Importing Component
import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import Button from "@/components/ui/Button/Button";

//* importing images
import Logo from "@/public/logo.png";

//* Icons
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

const ResetPasswordForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  if (params.get("id") === null) {
    return redirect("/");
  }

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [password, setPassword] = useState({
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState({
    password: "",
    password_confirmation: "",
  });

  //* Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visibility) => !visibility);
  };

  //* handle OTP FORM
  const handleForm = () => {
    const email = atob(params.get("id") ?? "");
    post(`${process.env.API_URL}auth/user/change-password`, {
      email: email,
      password: password.password,
      password_confirmation: password.password_confirmation,
    })
      .then((data) => {
        if (data.status === 400) {
          setError({
            password: data?.message?.password,
            password_confirmation: data?.message?.password_confirmation,
          });
        } else {
          const link = params.get("src")
            ? `/forgot-password/response-page?src=${params.get("src")}`
            : "/forgot-password/response-page";

          setPassword({
            password: "",
            password_confirmation: "",
          });

          setError({
            password: "",
            password_confirmation: "",
          });
          successToast("Password changed successfully...");
          router.push(link);
        }
      })
      .catch((error) => {
        setPassword({
          password: "",
          password_confirmation: "",
        });

        setError({
          password: "",
          password_confirmation: "",
        });
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

          <div className="form-container reset-password">
            <h6>Reset Password</h6>

            <div className="forms">
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  name="password"
                  placeholder="New Password"
                  value={password.password}
                  onChange={(e) =>
                    setPassword({
                      ...password,
                      password: e.target.value,
                    })
                  }
                />
                <div className="error">{error.password}</div>
              </div>

              <div className="form-group">
                <div className="addon">
                  <input
                    type={passwordVisibility ? "text" : "password"}
                    id="confirm_password"
                    className="form-input"
                    name="password"
                    placeholder="Confirm Password"
                    value={password.password_confirmation}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                  <div className="addon-icon">
                    <span
                      className={!passwordVisibility ? "d-none" : ""}
                      onClick={togglePasswordVisibility}
                    >
                      <FaRegEye />
                    </span>
                    <span
                      className={passwordVisibility ? "d-none" : ""}
                      onClick={togglePasswordVisibility}
                    >
                      <FaRegEyeSlash />
                    </span>
                  </div>
                </div>
                <div className="error">{error.password_confirmation}</div>
              </div>

              <div className="form-button-container center">
                <Button
                  btnType="button"
                  btnColor="secondary"
                  content="RESET PASSWORD"
                  clickEventName={handleForm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ResetPassword = () => {
  return (
    <>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
};

export default ResetPassword;
