"use client";

//* Importing Components
import React, { useState } from "react";

//* Importing css
import Style from "@/components/NewsLetter/NewsLetter.module.css";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

const NewsLetter: React.FC = () => {
  const [email, setEmail] = useState("");

  //* subscribe Newletter
  const subscribeNewsLetter = () => {
    post(`${process.env.API_URL}subscribe-newsletter`, {
      email: email,
    })
      .then((data) => {
        if (data.status === 400 && data?.message?.email) {
          errorToast(`${data?.message?.email}`);
        } else if (data.status === 400) {
          setEmail("");
          errorToast(
            "Dear Customer, You are already subscribed to our newletter. Thanks for showing intrest in us."
          );
        } else {
          setEmail("");
          successToast(
            "Dear Customer, You have now subscribed to our newletter. Thanks for showing intrest in us."
          );
        }
      })
      .catch((error) => {
        setEmail("");
        errorToast("something went wrong please try again later...");
      });
  };

  return (
    <section className={Style.news_letter_section}>
      <div className="app-container">
        <div className={Style.news_letter_container}>
          <div className={Style.news_letter_content}>
            <h6>Subscribe our Newsletter for newest updates</h6>
          </div>
          <div className={Style.subscribe_input_container}>
            <div className={Style.subscribe_input}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className={Style.subscribe_addon}
              onClick={subscribeNewsLetter}
            >
              <span>Subscribe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
