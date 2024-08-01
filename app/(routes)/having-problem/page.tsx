"use client";

//* Importing Component
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";

//* Images
import Logo from "@/public/logo.png";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

const HavingProblem = () => {
  const [query, setQuery] = useState({
    email: "",
    query: "",
  });

  const [error, setError] = useState({
    email_error: "",
    query_error: "",
  });

  const handleQuery = () => {
    post(`${process.env.API_URL}help-center`, query)
      .then((data) => {
        if (data.status === 400) {
          setError({
            email_error: data?.message?.email,
            query_error: data?.message?.query,
          });
        } else {
          setError({
            email_error: "",
            query_error: "",
          });
          setQuery({
            email: "",
            query: "",
          });
          successToast(
            "Dear Customer, We have recieved your query. we will into it as soon as possible and revert back to you. Be patience."
          );
        }
      })
      .catch((error) => {
        setError({
          email_error: "",
          query_error: "",
        });
        setQuery({
          email: "",
          query: "",
        });
        errorToast("something went wrong please try again later...");
      });
  };

  return (
    <>
      <section className="having-problem-section">
        <div className="app-container">
          <div className="having_problem_container">
            <div className="brand-logo">
              <Link href="/">
                <Image src={Logo} alt="Netbookflix" />
              </Link>
            </div>

            <div className="having-problem-form">
              <h6>Having any problem?</h6>

              <div className="forms">
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Type here"
                    value={query.query}
                    onChange={(e) =>
                      setQuery({
                        ...query,
                        query: e.target.value,
                      })
                    }
                  ></textarea>
                  <div className="error">{error.query_error}</div>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    name="email"
                    placeholder="Email*"
                    value={query.email}
                    onChange={(e) =>
                      setQuery({
                        ...query,
                        email: e.target.value,
                      })
                    }
                  />
                  <div className="error">{error.email_error}</div>
                </div>

                <div className="form-button-container center">
                  <Button
                    btnColor="secondary"
                    content="SUBMIT"
                    clickEventName={handleQuery}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default HavingProblem;
