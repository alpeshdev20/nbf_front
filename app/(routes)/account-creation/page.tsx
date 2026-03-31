"use client";

//* Importing Component
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import { getClasses } from "@/services/general";
import UserInterface from "@/interfaces/UserInterface";
import { post } from "@/utils/fetch";
import { useSession } from "@/providers/SessionProvider";
import { useRouter } from "next/navigation";
import Style from "./sign-up.module.css";

//* Images
import Logo from "@/public/logo.png";
import ChooseImage from "@/icons/upload.png";

//* Importing icons
import { errorToast, successToast } from "@/utils/toast_helper";

const SignUp = () => {
  const router = useRouter();
  //* Session
  const { isLoading, session } = useSession();

  //* Getting All Classes

  const [userId, setUserId] = useState<string | null>(null);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [display, setDisplay] = useState({
    form: true,
    otp: false,
    message: false,
  });

  useEffect(() => {
    console.log("Display state updated:", display);
  }, [display]);

  const [couponCode, setCouponCode] = useState<string>("");


  useEffect(() => {
    // This runs only on the client side after the component mounts
    const storedUserId = localStorage.getItem("user_id");
     setUserId(storedUserId);
  }, []);
  const applyCoupon = async () => {
    if (!couponCode) {
      errorToast("Please enter a coupon code!");
      return;
    }
    
    try {
      const data = await post(`${process.env.API_URL}free-trial-apply-coupon`, {
        couponCode,
        user_id: userId,
      });

      if (data.success) {
        successToast(`Coupon or referral code Applied!`);
        router.push("/");

      } else {
        errorToast("Invalid Coupon Code.");
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      errorToast("Something went wrong. Try again later.");
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCouponCode(value);
  };
  const [loading, setLoading] = useState(false);

  if (!isLoading && session.isLoggedIn) {
    // router.push("/");
    // aaply here new user created logic
    
  }
  return (
    <>
      <section className="sign-up-section">
        <div className="app-container">
          <div className="sign-up-container">
            <div className="brand-logo">
              <Link href="/">
                <Image src={Logo} alt="Netbookflix" />
              </Link>

              <div className="sign-up-form-container response-message">
                <div className="response-message-header">
                  <h6>Welcome to NETBOOKFLIX</h6>
                  <p>STREAM unlimited knowledge</p>
                </div>

                <div className="response-message-body">
                  <h6>Account Created!</h6>
                  <p className={Style.text_center}>
                    Choose how you'd like to get started
                  </p>
                </div>

                <div className={Style.option_buttons_container}>
                  {/* Start Free Trial */}
                  <div className={Style.option_card}>
                    <h5 className={Style.card_title}>Start Free Trial</h5>
                    <p className="text-center">
                      Start your free trial by entering a coupon or referral
                      code, or continue without one.
                    </p>
                    <div className={Style.coupon_container}>
                      <div className={Style.input_wrapper}>
                        <input
                          type="text"
                          placeholder="Enter Coupon Code"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            handleCouponChange(e);
                          }}
                          className={Style.coupon_input}
                        />
                        <button
                          className={Style.btn_apply_code}
                          onClick={() => applyCoupon()}
                        >
                          APPLY
                        </button>
                      </div>
                    </div>
                    <a className={Style.btn_start_free_trial} href="/">
                      Start Free Trial
                    </a>
                    {/* <Button
                          btnColor="primary"
                        /> */}
                  </div>

                  {/* OR */}

                  {/* Paid Plan */}
                  <div className={Style.option_card}>
                    <h6>Choose a Paid Plan</h6>
                    <p>Explore our premium plans to unlock all features</p>
                    <div className="view_plan_btn_sign_up">
                      <a className={Style.btn_start_free_trial} href="/plans">
                        VIEW PLANS
                      </a>
                      {/* <Button
                            link="/plans"
                            btnColor="primary"
                            content="VIEW PLANS"
                          /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
