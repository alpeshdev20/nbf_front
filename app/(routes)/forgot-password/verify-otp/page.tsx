"use client";

//* Importing Components
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  Suspense,
} from "react";
import Button from "@/components/ui/Button/Button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

//* importing images
import Logo from "@/public/logo.png";

const VerifyOTPForm = () => {
  const params = useSearchParams();
  const router = useRouter();

  if (params.get("id") === null) {
    redirect("/");
  } else {
    const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", ""]);
    const otpInputRefs: RefObject<HTMLInputElement>[] = [
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
      useRef<HTMLInputElement>(null),
    ]; // Refs for OTP input boxes

    const handleChange = (index: number, value: string) => {
      if (isNaN(Number(value))) return; // Allow only numeric input
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Focus on the next input box if a digit is VerifyOtpred
      if (index < otpInputRefs.length - 1 && value !== "") {
        otpInputRefs[index + 1].current?.focus();
      }
    };

    const handleKeyPress = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
        otpInputRefs[index - 1].current?.focus();
      }
    };

    //* handle OTP FORM
    const handleForm = () => {
      post(`${process.env.API_URL}auth/user/verify-forgot-password-otp`, {
        id: params.get("id"),
        otp: parseInt(otpValues.join("")),
      })
        .then((data) => {
          if (data.status === 400) {
            errorToast(`${data?.message?.otp}`);
          } else if (data.status === 401) {
            errorToast("Invalid OTP...");
          } else {
            setOtpValues(["", "", "", "", ""]);
            const link =
              params.get("src") === "k12"
                ? `/forgot-password/reset-password?src=${params.get(
                    "src"
                  )}&id=${btoa(data?.response.email)}`
                : `/forgot-password/reset-password?id=${btoa(
                    data?.response.email
                  )}`;

            successToast("OTP verified...");
            router.push(link);
          }
        })
        .catch((error) => {
          setOtpValues(["", "", "", "", ""]);
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

            <div className="form-container otp-forms">
              <h6>Enter Verification code</h6>

              <div className="forms">
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
                  <Button
                    btnType="button"
                    btnColor="secondary"
                    content="SUBMIT"
                    clickEventName={handleForm}
                  />
                </div>

                <div className="having-problem">
                  <Link href="/having-problem">Having any problem?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

const VerifyOtp: React.FC = () => {
  return (
    <>
      <Suspense>
        <VerifyOTPForm />
      </Suspense>
    </>
  );
};

export default VerifyOtp;
