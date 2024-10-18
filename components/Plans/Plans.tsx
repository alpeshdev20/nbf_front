"use client";

//* importing Components
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { useSession } from "@/providers/SessionProvider";

//* css
import Style from "@/components/Plans/Plans.module.css";

//* icons
import { FaCaretRight, FaRupeeSign } from "react-icons/fa";

import { getPlans } from "@/services/resources";
import { Root } from "@/interfaces/PaymentResponse";
import { errorToast } from "@/utils/toast_helper";
import initiatePayment from "@/services/payment";

const Plan = () => {
  //* Session Values
  const { session, isLoading } = useSession();

  const { planData } = getPlans();
  const [activeCategoryTab, setCategoryMainTab] = useState(1);
  const [activeSubCategoryTab, setActiveSubCategoryTab] = useState(1);

  const invokePaymentPage = (paymentData: Root) => {
    console.log(
      "payment initiated now ==>" + paymentData.response.body.txnToken
    );
    const config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: paymentData.orderId,
        token: paymentData.response.body.txnToken,
        tokenType: "TXN_TOKEN",
        amount: paymentData.amount,
      },
      handler: {
        notifyMerchant: function (eventName: any, data: any) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    {/* @ts-ignore */ }
    if (window.Paytm) {
      {/* @ts-ignore */ }
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          {/* @ts-ignore */ }
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error: any) {
          console.log("error => ", error);
        });
    } else {
      console.error("Paytm is not available on window object");
    }
  };

  const handleButtonClick = async (planId: number) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      errorToast("User ID not found. Please login again.");
      return;
    }

    try {
      const result = await initiatePayment(user_id, planId);
      if (result?.success) {
        invokePaymentPage(result);
      } else {
        errorToast("Something went wrong. Please try later!", 6000);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      errorToast("An error occurred. Please try again.");
    }
  };

  //* handle Category Tab
  const handleCategoryTab = (categoryId: number) => {
    setCategoryMainTab(categoryId);
    setActiveSubCategoryTab(1);
  };

  //* handle Sub Category Tab
  const handleSubCategoryTab = (subCategoryId: number) => {
    setActiveSubCategoryTab(subCategoryId);
  };

  const tabsColorsClasses = [Style.voilet, Style.green, Style.cyan];

  useEffect(() => {
    // Ensure this code only runs on the client side
    {/* @ts-ignore */ }
    if (typeof window !== "undefined" && window.Paytm) {
      console.log("Paytm is available on window object");
    } else {
      console.error("Paytm is not available on window object");
    }
  }, []);

  return (
    <>
      {/* Categories */}
      <div className={Style.plan_categories_tab_container}>
        {planData &&
          planData.map((category, index) => (
            <div
              className={
                category.id === activeCategoryTab
                  ? `${Style.plan_category_tab} ${Style.active_category_tab} ${tabsColorsClasses[index]}`
                  : `${Style.plan_category_tab}`
              }
              key={category.id}
              onClick={() => handleCategoryTab(category.id)}
            >
              <h5>{category.category}</h5>
            </div>
          ))}
      </div>

      {/* SubCategories */}
      <div className={Style.plans_sub_categories_container}>
        {planData &&
          planData.map((plan, mainIndex) => (
            <div className={Style.plans_sub_categories} key={plan.id}>
              {plan.id === activeCategoryTab &&
                plan.sub_category.map((sub_category) => (
                  <div
                    key={sub_category.id}
                    className={
                      sub_category.id === activeSubCategoryTab
                        ? `${Style.plan_sub_category_tab} ${Style.active_sub_category_tab} ${tabsColorsClasses[mainIndex]}`
                        : `${Style.plan_sub_category_tab}`
                    }
                    onClick={() => handleSubCategoryTab(sub_category.id)}
                  >
                    <h5>{sub_category.title}</h5>
                  </div>
                ))}
            </div>
          ))}
      </div>

      {/* Content */}
      <div className={Style.plans_sub_categories_subscriptions_section}>
        {planData &&
          planData.map((plan) => (
            <div
              className={Style.plans_sub_categories_subscriptions_container}
              key={plan.id}
            >
              {plan.sub_category.map((sub_category) => (
                <div
                  key={sub_category.id}
                  className={Style.plans_sub_categories_subscriptions}
                >
                  {plan.id === activeCategoryTab &&
                    sub_category.id === activeSubCategoryTab &&
                    sub_category.packages &&
                    sub_category.packages.map((subscription) => (
                      <div className={Style.subscription} key={subscription.id}>
                        <div className={Style.subscription_heading}>
                          <h6>{subscription.title}</h6>
                          <h3>
                            <FaRupeeSign />
                            {subscription.price}
                          </h3>
                        </div>
                        <div className={Style.subscription_content}>
                          <div className={Style.subscription_includes}>
                            {subscription.package_covers &&
                              subscription.package_covers.map(
                                (package_includes, index) => (
                                  <p key={index}>
                                    <FaCaretRight />
                                    {package_includes.content}
                                  </p>
                                )
                              )}
                          </div>

                          <Button
                            clickEventName={() =>
                              handleButtonClick(subscription.id)
                            }
                            btnType="button"
                            btnColor="secondary"
                            content="BUY NOW"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
      </div>

      {!isLoading && !session?.isLoggedIn && (
        <div className={Style.free_trail_section}>
          <div className={Style.subscription}>
            <div className={Style.subscription_heading}>
              <h6>FREE TRIAL</h6>
            </div>
            <div className={Style.subscription_content}>
              <div className={Style.subscription_includes}>
                <p>
                  <FaCaretRight />
                  3,000+ Books
                </p>
                <p>
                  <FaCaretRight />
                  Access to BASIC packaged e-Books for a period of 07 days
                </p>
                <p>
                  <FaCaretRight />3 AI Prompt Included
                </p>
              </div>

              <Button
                link="/sign-up"
                btnType="button"
                btnColor="secondary"
                content="START NOW"
                otherClass={Style.plans_free_trail_button}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Plan;