"use client";

//* components
import React, { useState } from "react";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import Image from "next/image";
import { post } from "@/utils/fetch";
import { errorToast, successToast } from "@/utils/toast_helper";

//*  images
import Logo from "@/public/logo.png";
import maxLengthCheck from "@/utils/maxlength";

const PartnerWithUs = () => {
  const [instituteData, setInstituteData] = useState({
    instituteName: "",
    studentEnrollment: "",
    contactPerson: "",
    contactPersonEmail: "",
    contactPersonMobileNo: "",
    summary: "",
  });

  const [error, setError] = useState({
    instituteNameError: "",
    studentEnrollmentError: "",
    contactPersonError: "",
    contactPersonEmailError: "",
    contactPersonMobileNoError: "",
    summaryError: "",
  });

  //* Submiting FOrm
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(`${process.env.API_URL}register-institute`, {
      institute_name: instituteData.instituteName,
      student_enrollment: instituteData.studentEnrollment,
      contact_person: instituteData.contactPerson,
      contact_person_email: instituteData.contactPersonEmail,
      contact_person_mobile_no: instituteData.contactPersonMobileNo,
      summary: instituteData.summary,
    })
      .then((data) => {
        if (data.status === 200) {
          successToast("Success");
          setError({
            instituteNameError: "",
            studentEnrollmentError: "",
            contactPersonError: "",
            contactPersonEmailError: "",
            contactPersonMobileNoError: "",
            summaryError: "",
          });
          setInstituteData({
            instituteName: "",
            studentEnrollment: "",
            contactPerson: "",
            contactPersonEmail: "",
            contactPersonMobileNo: "",
            summary: "",
          });
        } else if (data.status === 400) {
          setError({
            instituteNameError: data?.message?.institute_name?.toString(),
            studentEnrollmentError:
              data?.message?.student_enrollment?.toString(),
            contactPersonError: data?.message?.contact_person?.toString(),
            contactPersonEmailError:
              data?.message?.contact_person_email?.toString(),
            contactPersonMobileNoError:
              data?.message?.contact_person_mobile_no?.toString(),
            summaryError: data?.message?.summary?.toString(),
          });
        } else {
          setError({
            instituteNameError: "",
            studentEnrollmentError: "",
            contactPersonError: "",
            contactPersonEmailError: "",
            contactPersonMobileNoError: "",
            summaryError: "",
          });
          setInstituteData({
            instituteName: "",
            studentEnrollment: "",
            contactPerson: "",
            contactPersonEmail: "",
            contactPersonMobileNo: "",
            summary: "",
          });
          errorToast("something went wrong please try again later...");
        }
      })
      .catch((error) => {
        setError({
          instituteNameError: "",
          studentEnrollmentError: "",
          contactPersonError: "",
          contactPersonEmailError: "",
          contactPersonMobileNoError: "",
          summaryError: "",
        });
        setInstituteData({
          instituteName: "",
          studentEnrollment: "",
          contactPerson: "",
          contactPersonEmail: "",
          contactPersonMobileNo: "",
          summary: "",
        });
        errorToast("something went wrong please try again later...");
      });
  };

  return (
    <section className="partner-with-us-section">
      <div className="app-container">
        <div className="partner-with-us-container">
          <div className="brand-logo">
            <Link href="/">
              <Image src={Logo} alt="Netbookflix" priority />
            </Link>
          </div>

          <div className="partner-form-container">
            <h6>Partner with US</h6>

            <div className="partner-forms">
              <div className="form-group">
                <input
                  type="text"
                  id="partner_name"
                  className="form-input"
                  name="partner_name"
                  placeholder="School/College/University Name*"
                  value={instituteData.instituteName}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      instituteName: e.target.value,
                    })
                  }
                />
                <div className="error">{error.instituteNameError}</div>
              </div>

              <div className="form-group">
                <input
                  type="number"
                  id="student_enrollment"
                  className="form-input"
                  name="student_enrollment"
                  placeholder="Student Enrollment*"
                  value={instituteData.studentEnrollment}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      studentEnrollment: e.target.value,
                    })
                  }
                />
                <div className="error">{error.studentEnrollmentError}</div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="contact_person"
                  className="form-input"
                  name="contact_person"
                  placeholder="Contact Person Name*"
                  value={instituteData.contactPerson}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      contactPerson: e.target.value,
                    })
                  }
                />
                <div className="error">{error.contactPersonError}</div>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="partner_email"
                  className="form-input"
                  name="partner_email"
                  placeholder="Email"
                  value={instituteData.contactPersonEmail}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      contactPersonEmail: e.target.value,
                    })
                  }
                />
                <div className="error">{error.contactPersonEmailError}</div>
              </div>

              <div className="form-group">
                <input
                  type="number"
                  id="mobile_number"
                  className="form-input"
                  name="mobile_number"
                  placeholder="Phone No."
                  value={instituteData.contactPersonMobileNo}
                  onChange={(e) =>
                    setInstituteData({
                      ...instituteData,
                      contactPersonMobileNo: e.target.value,
                    })
                  }
                  maxLength={10}
                  onInput={maxLengthCheck}
                />
                <div className="error">{error.contactPersonMobileNoError}</div>
              </div>
            </div>

            <div className="form-group">
              <textarea
                id="summary"
                className="form-input"
                name="summary"
                placeholder="Summary"
                value={instituteData.summary}
                onChange={(e) =>
                  setInstituteData({
                    ...instituteData,
                    summary: e.target.value,
                  })
                }
              ></textarea>
              <div className="error">{error.summaryError}</div>
            </div>

            <div className="partner_conditions">
              <div className="form-checkbox">
                <input type="checkbox" name="agree_terms" id="agree_terms" />
                <span>I agree to be contacted by a member of the team</span>
              </div>

              <div className="form-checkbox">
                <input type="checkbox" name="agree_terms" id="agree_terms" />
                <span>
                  I'd like to receive general communications from Netbookflix
                </span>
              </div>

              <p>You may unsubscribe from these communications at any time.</p>
              <p>
                By clicking submit below, you consent to allow Netbookflix to
                store and process the personal information submitted above to
                provide you the content requested.
              </p>
            </div>

            <div className="form-button-container center">
              <Button
                btnType="submit"
                btnColor="primary"
                content="SUBMIT"
                clickEventName={(e) => handleForm(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerWithUs;
