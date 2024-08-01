"use client";

//* Importing Component
import React, { useState, Suspense } from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Button from "@/components/ui/Button/Button";
import { useSearchParams, useRouter, redirect } from "next/navigation";

//* Images
import Logo from "@/public/logo-white.png";
import EmptyStar from "@/icons/empty-star.png";
import FilledStar from "@/icons/filled-star.png";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

const FeedbackForm = () => {
  const router = useRouter();
  const params = useSearchParams();

  const userId = params.get("id");
  if (userId === null) {
    return redirect("/");
  }
  const [rating, setRating] = useState(0);

  //* Handle rating
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleFeedback = () => {
    if (rating === 0) {
      errorToast("You need to select at leat one star...");
      return false;
    }

    post(`${process.env.API_URL}feedback`, {
      id: userId,
      feedback: rating.toString(),
    })
      .then((data) => {
        if (data.status === 200) {
          successToast("Dear Customer, Thank you for your valueable feedback");
          setRating(0);
          router.push("/");
        } else {
          setRating(0);
          errorToast("something went wrong please try again later...");
        }
      })
      .catch((error) => {
        setRating(0);
        errorToast("something went wrong please try again later...");
      });
  };

  return (
    <section className="feedback-section">
      <div className="app-container">
        <div className="feedback-container">
          <div className="feedback-content-container">
            <div className="feedback-brand-logo">
              <Image src={Logo} alt="Netbookflix" />
            </div>
            <div className="feedback-content">
              <h6>We value your feedback!</h6>
              <p>How satisfied are you with our product?</p>
            </div>
            <div className="start-rating-container">
              <Rating
                onClick={handleRating}
                initialValue={0}
                iconsCount={5}
                allowFraction={false}
                allowHover={false}
                disableFillHover={false}
                emptyIcon={<Image src={EmptyStar} alt="Empty Star" />}
                fillIcon={<Image src={FilledStar} alt="Filled Star" />}
              />
            </div>

            <div className="feedback-button-container">
              <Button link="/" content="SKIP" btnColor="primary" />
              <Button
                btnType="button"
                content="SUBMIT"
                btnColor="primary"
                clickEventName={handleFeedback}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Feedback = () => {
  return (
    <Suspense>
      <FeedbackForm />
    </Suspense>
  );
};

export default Feedback;
