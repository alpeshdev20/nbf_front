"use client";

//* Compoonents
import React, {
  useState,
  // useRef,
  // ChangeEvent,
  // KeyboardEvent,
  // RefObject,
} from "react";
import UserLayout from "../user-layout";
import Button from "@/components/ui/Button/Button";

//* Icons
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import ProfileIcon from "@/icons/profile.png";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

const ChangePassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [password, setPassword] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  //* Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisibility((visibility) => !visibility);
  };

  // const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", ""]);
  // const otpInputRefs: RefObject<HTMLInputElement>[] = [
  //   useRef<HTMLInputElement>(null),
  //   useRef<HTMLInputElement>(null),
  //   useRef<HTMLInputElement>(null),
  //   useRef<HTMLInputElement>(null),
  //   useRef<HTMLInputElement>(null),
  // ]; // Refs for OTP input boxes

  // const handleChange = (index: number, value: string) => {
  //   if (isNaN(Number(value))) return; // Allow only numeric input
  //   const newOtpValues = [...otpValues];
  //   newOtpValues[index] = value;
  //   setOtpValues(newOtpValues);

  //   // Focus on the next input box if a digit is VerifyOtpred
  //   if (index < otpInputRefs.length - 1 && value !== "") {
  //     otpInputRefs[index + 1].current?.focus();
  //   }
  // };

  // const handleKeyPress = (
  //   index: number,
  //   e: KeyboardEvent<HTMLInputElement>
  // ) => {
  //   // Focus on the previous input box when the Backspace key is pressed
  //   if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
  //     otpInputRefs[index - 1].current?.focus();
  //   }
  // };

  //* handle OTP FORM
  const handleForm = () => {
    post(`${process.env.API_URL}user/change-password`, {
      old_password: password.old_password,
      password: password.password,
      password_confirmation: password.password_confirmation,
    })
      .then((data) => {
        if (data.status === 400) {
          setError({
            old_password: data?.message?.old_password,
            password: data?.message?.password,
            password_confirmation: data?.message?.password_confirmation,
          });
        } else {
          setPassword({
            old_password: "",
            password: "",
            password_confirmation: "",
          });

          setError({
            old_password: "",
            password: "",
            password_confirmation: "",
          });
          successToast("Password changed successfully...");
        }
      })
      .catch((error) => {
        setPassword({
          old_password: "",
          password: "",
          password_confirmation: "",
        });

        setError({
          old_password: "",
          password: "",
          password_confirmation: "",
        });
        errorToast("something went wrong please try again later...");
      });
  };

  return (
    <UserLayout pageIcon={ProfileIcon} pageTitle="Change Password">
      <section className="change-password-section">
        <div className="change-password-container">
          <div className="change-password-form-container">
            <div className="form-group">
              <input
                type="password"
                id="old_password"
                className="form-input"
                name="old_password"
                placeholder="Old Password"
                value={password.old_password}
                onChange={(e) =>
                  setPassword({
                    ...password,
                    old_password: e.target.value,
                  })
                }
              />
              <div className="error">{error.old_password}</div>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="new_password"
                className="form-input"
                name="new_password"
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

            {/* <p>We will send the verification code to your email address.</p>
            <p>Please check your inbox to retrieve the code.</p> */}

            <div className="form-button-container center">
              <Button
                btnColor="primary"
                content="Submit"
                clickEventName={handleForm}
              />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="change-password-section">
        <div className="change-password-container">
          <div className="change-password-form-container">
            <h6>Enter Verification code</h6>
            <div className="form-otp">
              {otpValues.map((value, index) => (
                <div className="form-group" key={index}>
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={value}
                    className="form-input"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, e.target.value)
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                      handleKeyPress(index, e)
                    }
                    ref={otpInputRefs[index]}
                  />
                </div>
              ))}
            </div>

            <div className="form-button-container center">
              <Button btnColor="primary" content="Submit" />
            </div>
          </div>
        </div>
      </section> */}
    </UserLayout>
  );
};

export default ChangePassword;
