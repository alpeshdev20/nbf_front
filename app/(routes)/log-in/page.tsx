"use client";

//* Importing Component
import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import AuthButton from "@/components/AuthButton/AuthButton";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";

//* importing images
import Logo from "@/public/logo.png";

//* Importing icons
import Google from "@/icons/google.png";
import Facebook from "@/icons/fb.png";
import Apple from "@/icons/apple.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

const LogInForm = () => {
  const router = useRouter();
  const { setSession } = useSession();

  const params = useSearchParams();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  //* Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visibility) => !visibility);
  };

  //* Submiting FOrm
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(`${process.env.API_URL}auth/user/authenticate-user`, authData)
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("token", data?.response?.token);
          localStorage.setItem("name", data?.response?.name);
          localStorage.setItem("user_id", data?.response?.user_id);
          successToast("Success");
          setSession({
            isLoggedIn: true,
            user: data?.response,
          });
          router.push("/");
        } else if (data.status === 400) {
          if (data.message.email || data.message.password) {
            setError({
              emailError: data?.message?.email?.toString(),
              passwordError: data?.message?.password?.toString(),
            });
          } else {
            setError({
              emailError: "",
              passwordError: "Invalid Credentials...",
            });
          }
        } else {
          setAuthData({
            email: "",
            password: "",
          });

          setError({
            emailError: "",
            passwordError: "",
          });
          errorToast("something went wrong please try again later...");
        }
      })
      .catch((error) => {
        setAuthData({
          email: "",
          password: "",
        });

        setError({
          emailError: "",
          passwordError: "",
        });
        errorToast("something went wrong please try again later...");
      });
  };

  return (
    <>
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
              <h6>Sign In</h6>
              <p>
                New User?
                <b>
                  <Link href="/sign-up"> Sign Up</Link>
                </b>
              </p>
              <div className="forms">
                <form onSubmit={(e) => handleForm(e)}>
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      className="form-input"
                      name="email"
                      placeholder="Email"
                      value={authData.email}
                      onChange={(e) =>
                        setAuthData({
                          ...authData,
                          email: e.target.value,
                        })
                      }
                    />
                    <div className="error">{error.emailError}</div>
                  </div>
                  <div className="form-group">
                    <div className="addon">
                      <input
                        type={passwordVisibility ? "text" : "password"}
                        id="password"
                        className="form-input"
                        name="password"
                        placeholder="Password"
                        value={authData.password}
                        onChange={(e) =>
                          setAuthData({
                            ...authData,
                            password: e.target.value,
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
                    <div className="error">{error.passwordError}</div>
                  </div>

                  <div className="form-button-container end">
                    <Button
                      btnType="submit"
                      btnColor="secondary"
                      content="LOGIN"
                      clickEventName={(e) => handleForm(e)}
                    />
                    <Link
                      href={
                        params.get("src")
                          ? `/forgot-password?src=${params.get("src")}`
                          : "/forgot-password"
                      }
                    >
                      Forgot Password
                    </Link>
                  </div>
                </form>
              </div>

              {/* <div className="form-separator-container">
                <div className="form-separator-line"></div>
                <div className="form-separator-text">OR</div>
                <div className="form-separator-line"></div>
              </div> */}

              <div className="form-auth">
                {/* <AuthButton img={Google} content="Continue with Google" />
                <AuthButton img={Facebook} content="Continue with Facebook" /> */}
                {/* <AuthButton img={Apple} content="Continue with Apple" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const LogIn = () => {
  return (
    <Suspense>
      <LogInForm />
    </Suspense>
  );
};

export default LogIn;
