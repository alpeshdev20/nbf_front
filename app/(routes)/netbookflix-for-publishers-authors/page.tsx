"use client";

//* Components
import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import Navbar from "@/components/layout/Navbar/Navbar";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import maxLengthCheck from "@/utils/maxlength";

//* images
import EcosystemImage from "@/images/publishers/ecosystem.png";
import ReachImage from "@/images/publishers/reach.png";
import { postFormData } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

const NbfForPublishers = () => {
  const [loading, setLoading] = useState(false);

  const [authorData, setAuthorData] = useState({
    publisherName: "",
    email: "",
    // assets: "",
    // language: "",
    contactNumber: "",
    attchment: "",
    attchmentFile: null as File | null,
  });

  const [error, setError] = useState({
    publisherNameError: "",
    emailError: "",
    // assetsError: "",
    // languageError: "",
    contactNumberError: "",
    attachmentError: "",
  });

  //* Submiting FOrm
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("publisher_name", authorData.publisherName);
    formData.append("email", authorData.email);
    formData.append("mobile_number", authorData.contactNumber);
    if (authorData.attchmentFile) {
      formData.append("attachment", authorData.attchmentFile);
    }

    postFormData(`${process.env.API_URL}register-publisher`, formData)
      .then((data) => {
        setLoading(false);
        if (data.status === 200) {
          successToast(
            "Thank you for showing intrested in Netbookflix. We have recieved your request our team will connect with you soon."
          );
          setError({
            publisherNameError: "",
            emailError: "",
            contactNumberError: "",
            attachmentError: "",
          });
          setAuthorData({
            publisherName: "",
            email: "",
            // assets: "",
            // language: "",
            contactNumber: "",
            attchment: "",
            attchmentFile: null as File | null,
          });
        } else if (data.status === 400) {
          setLoading(false);
          setError({
            publisherNameError: data?.message?.publisher_name?.toString(),
            emailError: data?.message?.email?.toString(),
            contactNumberError: data?.message?.mobile_number?.toString(),
            attachmentError: data?.message?.attachment?.toString(),
          });
        } else {
          setLoading(false);
          setError({
            publisherNameError: "",
            emailError: "",
            contactNumberError: "",
            attachmentError: "",
          });
          setAuthorData({
            publisherName: "",
            email: "",
            // assets: "",
            // language: "",
            contactNumber: "",
            attchment: "",
            attchmentFile: null as File | null,
          });
          errorToast("something went wrong please try again later...");
        }
      })
      .catch((error) => {
        setLoading(true);
        setError({
          publisherNameError: "",
          emailError: "",
          contactNumberError: "",
          attachmentError: "",
        });
        setAuthorData({
          publisherName: "",
          email: "",
          // assets: "",
          // language: "",
          contactNumber: "",
          attchment: "",
          attchmentFile: null as File | null,
        });
        errorToast("something went wrong please try again later...");
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAuthorData({
        ...authorData,
        attchment: e.target.value,
        attchmentFile: file,
      });
    }
  };

  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      <div className="nbf_ecosystem">
        <div className="nbf_ecosystem_container">
          <div className="nbf_ecosystem_content_container">
            <div className="nbf_ecosystem_content">
              <p>
                Netbookflix for <span>Publisher & Author</span>
              </p>
              <h5>“Earn incrementally</h5>
              <h5>with Netbookflix Ecosystem”</h5>
              <h3>Why only Books?</h3>
              <h6>when you can monetize your Book plus ASSETS?</h6>

              <div className="nbf_ecosystem_resources">
                <p>eBooks</p>
                <p>Audio books</p>
                <p>Podcasts</p>
                <p>Study guide</p>
                <p>AR/VR</p>
                <p>Question bank</p>
                <p>Gamified learning</p>
                <p>Author Video clips & Lectures</p>
              </div>
            </div>
          </div>

          <div className="nbf_ecosystem_image">
            <Image src={EcosystemImage} alt="Ecosystem Image" priority />
          </div>
        </div>
      </div>

      <div className="publisher_nbf_ai_section">
        <div className="app-container">
          <h4>
            <span>World’s First AI Enabled</span> learning resource subscription
            platform,
          </h4>
          <h4>Trusted by students globally.</h4>

          <h5>Join the platform! Provide details and we shall be in touch</h5>

          <div className="publisher_nbf_ai_form_container">
            <div className="publisher_nbf_ai_form">
              <div className="form-group">
                <label htmlFor="publisher_name">Publisher Name*</label>
                <input
                  type="text"
                  id="publisher_name"
                  className="form-input"
                  name="publisher_name"
                  // placeholder="Publisher Name*"
                  value={authorData.publisherName}
                  onChange={(e) =>
                    setAuthorData({
                      ...authorData,
                      publisherName: e.target.value,
                    })
                  }
                />
                <div className="error">{error.publisherNameError}</div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  name="email"
                  // placeholder="Email*"
                  value={authorData.email}
                  onChange={(e) =>
                    setAuthorData({
                      ...authorData,
                      email: e.target.value,
                    })
                  }
                />
                <div className="error">{error.emailError}</div>
              </div>

              <div className="form-group">
                <label htmlFor="number">Contact Number*</label>
                <input
                  type="number"
                  id="number"
                  className="form-input"
                  name="number"
                  // placeholder="number*"
                  value={authorData.contactNumber}
                  onChange={(e) =>
                    setAuthorData({
                      ...authorData,
                      contactNumber: e.target.value,
                    })
                  }
                  maxLength={10}
                  onInput={maxLengthCheck}
                />
                <div className="error">{error.contactNumberError}</div>
              </div>

              <div className="form-group">
                <label htmlFor="">Upload your resource catalogue*</label>
                <input
                  type="file"
                  name="resume"
                  id="resume"
                  className="form-input file"
                  value={authorData.attchment}
                  onChange={handleFileChange}
                />
                <div className="error">{error.attachmentError}</div>
              </div>
            </div>

            <div className="form-button-container center">
              {!loading && (
                <Button
                  btnColor="primary"
                  content="SUBMIT"
                  clickEventName={(e) => handleForm(e)}
                />
              )}

              {loading && (
                <Button
                  showLoadingButton={true}
                  btnType="button"
                  btnColor="primary"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="nbf_reach_section">
        <div className="nbf_reach_container">
          <div className="nbf_reach_content">
            <h3>WHY NETBOOKFLIX CAN BE</h3>
            <h3>YOUR BEST PARTNER?</h3>
            <h6>REACH</h6>
            <p>Netbookflix provides Publishers:</p>
          </div>

          <div className="nbf_reach_info_section">
            <div className="nbf_reach_info_container">
              <div className="nbf_reach_info_image">
                <Image src={ReachImage} alt="Ecosystem Image" priority />
              </div>
              <div className="nbf_reach_info_content">
                < h6>Global students & faculty reach to 120+ countries</h6>
                <p>Market Books in multiple Indian and foreign languages</p>
                <p>Key Author engagement and retention leveraging Usage data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nbf_publisher_other_content_section">
        <div className="app-container">
          <div className="nbf_publisher_other_content">
            <h4>Why monetize Books?</h4>
            <h4>When you can monetize your entire digital Assets?</h4>
            <ul>
              <li>
                Stop Burdening the Book price with extra Digital Asset cost
              </li>
              <li>
                Publishers can INVEST into building high quality book Plus
                digital content library
              </li>
              <li>
                Multiply revenue on Marquee Authors by leveraging Book PLUS as a
                growth strategy
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="nbf_publisher_other_content_section">
        <div className="app-container">
          <div className="nbf_publisher_other_content">
            <h4>Provide a Digital alternative to Piracy,</h4>
            <h4>photocopy and second-hand books</h4>
            <p>
              With Netbookflix’s daily subscription plan and its AI tool as
              value addition, Publishers & Authors
            </p>
            <p>
              can leverage and regain huge revenue loss on account of micro
              content use.
            </p>
          </div>
        </div>
      </div>

      <div className="nbf_publisher_other_content_section">
        <div className="app-container">
          <div className="nbf_publisher_other_content">
            <h4>Learn About Learners and their Preferences</h4>
            <h4></h4>
            <p>
              Access to Real-time insight into demographical and geographical
              information to learn about learner’s choices and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="nbf_publisher_other_content_section last_content">
        <div className="app-container">
          <div className="nbf_publisher_other_content">
            <h4>Partner & Acquire Best Selling Authors</h4>
            <h4></h4>
            <p>
              Netbookflix University Press Publishing Solution (UPPS) in
              partnership with institutions provides a
            </p>
            <p>
              limited access to tried and tested Print/Book PLUS resources for
              various Local & Global Publishing program
            </p>
          </div>
        </div>
      </div>

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default NbfForPublishers;
