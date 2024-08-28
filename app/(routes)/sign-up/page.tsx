"use client";

//* Importing Component
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  RefObject,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { getClasses } from "@/services/general";
import UserInterface from "@/interfaces/UserInterface";
import { post } from "@/utils/fetch";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";

//* Images
import Logo from "@/public/logo.png";
import ChooseImage from "@/icons/upload.png";

//* Importing icons
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { errorToast, successToast } from "@/utils/toast_helper";
import maxLengthCheck from "@/utils/maxlength";

const SignUp = () => {
  const router = useRouter();
  //* Session
  const { isLoading, session } = useSession();

  //* Getting All Classes
  const { classesData } = getClasses();

  const [userId, setUserId] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [display, setDisplay] = useState({
    form: true,
    otp: false,
    message: false,
  });

  const [showTokenField, setShowTokenField] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInterface>({
    name: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    gender: "",
    segment: "",
    class: "",
    personal_address: "",
    institute_address: "",
    registration_type: "",
    registration_token: "",
  });

  const [error, setError] = useState({
    userTypeError: "",
    tokenError: "",
    nameError: "",
    mobileError: "",
    passwordError: "",
    emailError: "",
    dobError: "",
    genderError: "",
    segmentError: "",
    classError: "",
    personalAddressError: "",
    instituteAddressError: "",
    termsError: "",
  });

  //! FOr OTP
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const otpInputRefs: RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]; // Refs for OTP input boxes

  const [loading, setLoading] = useState(false);

  if (!isLoading && session.isLoggedIn) {
    router.push("/");
  }

  if (!isLoading && !session.isLoggedIn) {
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
      // Focus on the previous input box when the Backspace key is pressed
      if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
        otpInputRefs[index - 1].current?.focus();
      }
    };

    //* On CLick
    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setLoading(true);
      post(`${process.env.API_URL}auth/user/create-account`, userInfo)
        .then((data) => {
          if (data.status === 200) {
            setUserId(data.response.id);
            successToast("Success, please verify yourself.");
            setDisplay({ form: false, otp: true, message: false });
          } else if (data.status === 400) {
            setLoading(false);
            setError({
              userTypeError: data?.message?.registration_type?.toString(),
              tokenError: data?.message?.registration_token?.toString(),
              nameError: data?.message?.name?.toString(),
              mobileError: data?.message?.mobile?.toString(),
              passwordError: data?.message?.password?.toString(),
              emailError: data?.message?.email?.toString(),
              dobError: data?.message?.dob?.toString(),
              genderError: data?.message?.gender?.toString(),
              segmentError: data?.message?.segment?.toString(),
              classError: data?.message?.class?.toString(),
              personalAddressError: data?.message?.personal_address?.toString(),
              instituteAddressError:
                data?.message?.institute_address?.toString(),
              termsError:
                isChecked === false
                  ? "Please accept the terms and conditions"
                  : "",
            });
          } else {
            setLoading(false);
            setUserInfo({
              name: "",
              email: "",
              mobile: "",
              password: "",
              dob: "",
              gender: "",
              segment: "",
              class: "",
              personal_address: "",
              institute_address: "",
              registration_type: "",
              registration_token: "",
            });

            setError({
              userTypeError: "",
              tokenError: "",
              nameError: "",
              mobileError: "",
              passwordError: "",
              emailError: "",
              dobError: "",
              genderError: "",
              segmentError: "",
              classError: "",
              personalAddressError: "",
              instituteAddressError: "",
              termsError: "",
            });
            setUserId("");
            errorToast("something went wrong please try again later...");
          }
        })
        .catch((error) => {
          setLoading(false);
          setUserInfo({
            name: "",
            email: "",
            mobile: "",
            password: "",
            dob: "",
            gender: "",
            segment: "",
            class: "",
            personal_address: "",
            institute_address: "",
            registration_type: "",
            registration_token: "",
          });

          setError({
            userTypeError: "",
            tokenError: "",
            nameError: "",
            mobileError: "",
            passwordError: "",
            emailError: "",
            dobError: "",
            genderError: "",
            segmentError: "",
            classError: "",
            personalAddressError: "",
            instituteAddressError: "",
            termsError: "",
          });
          setUserId("");
          errorToast("something went wrong please try again later...");
        });
    };

    //* Password Visibility
    const togglePasswordVisibility = () => {
      setPasswordVisibility((visibility) => !visibility);
    };

    //*  Handle User Type
    function handleUserType(userType: number) {
      setShowTokenField(userType === 3 ? true : false);
      setUserInfo({ ...userInfo, registration_type: userType });
    }

    //* Handling Checkbox
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
    };

    //* Verify OTP
    const verifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      post(`${process.env.API_URL}auth/user/verify-otp`, {
        id: userId,
        otp: parseInt(otpValues.join("")),
      })
        .then((data) => {
          if (data.status === 200) {
            successToast("Success, please verify yourself.");
            setDisplay({ form: false, otp: false, message: true });
          } else if (data.status === 401) {
            errorToast(data?.message?.otp?.toString());
          } else {
            setOtpValues(["", "", "", "", "", ""]);
            errorToast("something went wrong please try again later...");
          }
        })
        .catch((error) => {
          setOtpValues(["", "", "", "", "", ""]);
          errorToast("something went wrong please try again later...");
        });
    };

    return (
      <>
        <section className="sign-up-section">
          <div className="app-container">
            <div className="sign-up-container">
              <div className="brand-logo">
                <Link href="/">
                  <Image src={Logo} alt="Netbookflix" />
                </Link>

                {display.form && (
                  <div className="sign-up-form-container">
                    <div className="sign-up-form-header">
                      <div className="sign_up_account_type_container">
                        <div className="sign_up_account_type">
                          <h6>Create your Account</h6>
                          <div className="signup-user-type-container">
                            <div className="signup-user-type">
                              <div className="sign-up-accounts">
                                <div className="form-radio">
                                  <input
                                    type="radio"
                                    name="account_type"
                                    id="account_type"
                                    value={0}
                                    onClick={() => handleUserType(0)}
                                  />
                                  <b>Individual User</b>
                                </div>

                                <div className="form-radio">
                                  <input
                                    type="radio"
                                    name="account_type"
                                    id="account_type"
                                    value={3}
                                    onClick={() => handleUserType(3)}
                                  />
                                  <b>Institutional User</b>
                                </div>
                              </div>
                              <div className="error">{error.userTypeError}</div>
                            </div>
                            {showTokenField && (
                              <div className="form-group">
                                <input
                                  type="text"
                                  id="token"
                                  className="form-input"
                                  name="token"
                                  placeholder="Registration Token"
                                  onChange={(e) =>
                                    setUserInfo({
                                      ...userInfo,
                                      registration_token: e.target.value,
                                    })
                                  }
                                />
                                <div className="error">{error.tokenError}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* <div className="choose_img">
                        <Image src={ChooseImage} alt="choose image" />
                        <input
                          type="file"
                          name="profile_image"
                          id="profile_image"
                          className="d-none"
                        />
                      </div> */}
                    </div>

                    <div className="sign-up-form grid-two">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-input"
                          name="name"
                          placeholder="Name*"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              name: e.target.value,
                            })
                          }
                        />
                        <div className="error">{error.nameError}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-input"
                          name="email"
                          placeholder="Email*"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              email: e.target.value,
                            })
                          }
                        />
                        <div className="error">{error.emailError}</div>
                      </div>

                      <div className="form-group">
                        <input
                          type="number"
                          id="mobile_number"
                          className="form-input"
                          name="mobile_number"
                          placeholder="(+91)"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              mobile: e.target.value,
                            })
                          }
                          maxLength={10}
                          onInput={maxLengthCheck}
                        />
                        <div className="error">{error.mobileError}</div>
                      </div>

                      <div className="form-group">
                        <div className="addon">
                          <input
                            type={passwordVisibility ? "text" : "password"}
                            id="password"
                            className="form-input"
                            name="password"
                            placeholder="Password"
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
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

                      <div className="form-group">
                        <label htmlFor="birthday">BirthDay</label>
                        <input
                          type="date"
                          id="birthday"
                          className="form-input"
                          name="birthday"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              dob: e.target.value,
                            })
                          }
                        />
                        <div className="error">{error.dobError}</div>
                      </div>

                      <div className="form-group">
                        <label htmlFor=""></label>
                        <select
                          name="gender"
                          id="gender"
                          className="mt16"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              gender: e.target.value,
                            })
                          }
                        >
                          <option value="">Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Female">Others</option>
                        </select>
                        <div className="error">{error.genderError}</div>
                      </div>

                      <div className="form-group">
                        <h6>Preferred Segment</h6>
                        <div className="form-radio-group">
                          <div className="form-radio">
                            <input
                              type="radio"
                              name="preferred_segment"
                              id="preferred_segment"
                              value="K12/School"
                              onClick={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  segment: "K12/School",
                                })
                              }
                            />
                            <span>K12/ School</span>
                          </div>
                          <div className="form-radio">
                            <input
                              type="radio"
                              name="preferred_segment"
                              id="preferred_segment"
                              value="Higher Education"
                              onClick={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  segment: "Higher Education",
                                })
                              }
                            />
                            <span>Higher Education</span>
                          </div>
                        </div>
                        <div className="error">{error.segmentError}</div>
                      </div>
                      <div className="form-group">
                          <label htmlFor=""></label>
                          <select
                            name="class"
                            id="class"
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                class: e.target.value,
                              })
                            }
                            disabled={userInfo.segment === "Higher Education"} // Conditionally disable the select
                          >
                            <option value="">Select Class</option>
                            {classesData?.map((data) => {
                              return (
                                <option value={data.id} key={data.id}>
                                  {data.class_name}
                                </option>
                              );
                            })}
                          </select>
                          <div className="error">{error.classError}</div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="personal_address">
                          Personal Address
                        </label>
                        <textarea
                          name="personal_address"
                          id="personal_address"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              personal_address: e.target.value,
                            })
                          }
                        ></textarea>
                        <div className="error">
                          {error.personalAddressError}
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="institute_address">
                          Institute Address
                        </label>
                        <textarea
                          name="institute_address"
                          id="institute_address"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              institute_address: e.target.value,
                            })
                          }
                        ></textarea>
                        <div className="error">
                          {error.instituteAddressError}
                        </div>
                      </div>
                    </div>

                    <div className="sign-up-condition">
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          name="agree_terms"
                          id="agree_terms"
                          onChange={handleCheckboxChange}
                        />
                        <span>
                          By creating an account, I agree to Netbookflix's
                          <Link href="/terms-and-conditions">
                            &nbsp;terms and conditions&nbsp;
                          </Link>
                          And
                          <Link href="/privacy-policies"> Privacy Policy</Link>
                        </span>
                      </div>
                      <div className="error">{error.termsError}</div>
                    </div>

                    <div className="form-button-container end">
                      {!loading && (
                        <Button
                          btnColor="secondary"
                          content="GET STRATED"
                          clickEventName={(e) => handleForm(e)}
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
                )}

                {display.otp && (
                  <div className="sign-up-form-container">
                    <div className="signup-otp">
                      <p>
                        We will send the verification code to your email
                        address.
                      </p>
                      <p>Please check your inbox to retrieve the code.</p>
                      <h6>Enter Verification code</h6>

                      <div className="forms">
                        <div className="form-otp-container">
                          <div className="form-otp">
                            {otpValues.map((value, index) => (
                              <div className="form-group" key={index}>
                                <input
                                  key={index}
                                  type="text"
                                  maxLength={1}
                                  value={value}
                                  className="form-input"
                                  onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) => handleChange(index, e.target.value)}
                                  onKeyDown={(
                                    e: KeyboardEvent<HTMLInputElement>
                                  ) => handleKeyPress(index, e)}
                                  ref={otpInputRefs[index]}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="form-button-container center">
                          <Button
                            btnColor="secondary"
                            content="Verify OTP"
                            clickEventName={(e) => verifyOTP(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {display.message && (
                  <div className="sign-up-form-container response-message">
                    <div className="response-message-header">
                      <h6>Welcome to NETBOOKFLIX</h6>
                      <p>STREAM unlimited knowledge</p>
                    </div>

                    <div className="response-message-body">
                      <h6>Account Created!</h6>
                    </div>

                    <div className="form-button-container center">
                      <Button
                        link="/log-in"
                        btnColor="secondary"
                        content="LOGIN"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return null;
};

export default SignUp;
