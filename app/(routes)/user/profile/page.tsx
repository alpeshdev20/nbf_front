"use client";

//* Compoonents
import React, { useEffect, useState } from "react";
import UserLayout from "../user-layout";
import Button from "@/components/ui/Button/Button";
import { getProfile } from "@/services/profile";
import maxLengthCheck from "@/utils/maxlength";
import { errorToast, successToast } from "@/utils/toast_helper";
import { post } from "@/utils/fetch";

//* icons
import ProfileIcon from "@/icons/profile.png";

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { profile, isLoading } = getProfile();
  const [userInfo, setUserInfo] = useState<any>({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    personal_address: "",
    institute_address: "",
  });

  const [error, setError] = useState({
    name_error: "",
    email_error: "",
    mobile_error: "",
    dob_error: "",
    gender_error: "",
    personal_address_error: "",
    institute_address_error: "",
  });

  useEffect(() => {
    if (profile !== null) {
      setUserInfo({
        name: profile.name,
        email: profile.email,
        mobile: profile.mobile.toString(),
        dob: profile.birthday,
        gender: profile.gender,
        personal_address: profile.personal_address,
        institute_address: profile.institute_address,
      });
    }

    return () => {
      setSubmitted(false);
    };
  }, [isLoading, profile, submitted]);

  const makeFieldEditable = () => {
    setEditable(!editable);
  };

  //* handle Form
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(`${process.env.API_URL}user/profile/update`, {
      name: userInfo.name,
      mobile: userInfo.mobile,
      dob: userInfo.dob,
      gender: userInfo.gender,
      personal_address: userInfo.personal_address,
      institute_address: userInfo.institute_address,
    })
      .then((data) => {
        if (data.status === 200) {
          setEditable(false);
          successToast("Success");
        } else if (data.status === 400) {
          setError({
            name_error: data?.message?.name?.toString(),
            email_error: data?.message?.email?.toString(),
            mobile_error: data?.message?.mobile?.toString(),
            dob_error: data?.message?.dob?.toString(),
            gender_error: data?.message?.gender?.toString(),
            personal_address_error: data?.message?.personal_address?.toString(),
            institute_address_error:
              data?.message?.institute_address?.toString(),
          });
        } else {
          setError({
            name_error: "",
            email_error: "",
            mobile_error: "",
            dob_error: "",
            gender_error: "",
            personal_address_error: "",
            institute_address_error: "",
          });
          errorToast("something went wrong please try again later...");
        }
      })
      .catch(() => {
        setError({
          name_error: "",
          email_error: "",
          mobile_error: "",
          dob_error: "",
          gender_error: "",
          personal_address_error: "",
          institute_address_error: "",
        });
        errorToast("something went wrong please try again later...");
      });
  };

  return (
    <UserLayout pageTitle="Personal Information" pageIcon={ProfileIcon}>
      <div className="user-profile-section">
        <div className="user-profile-container">
          <form onSubmit={(e) => handleForm(e)}>
            <div className="user-form-container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  name="name"
                  placeholder="Name*"
                  readOnly={!editable}
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      name: e.target.value,
                    })
                  }
                />
                <div className="error">{error.name_error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="profile_email">Email</label>
                <input
                  type="email"
                  id="profile_email"
                  className="form-input"
                  name="profile_email"
                  placeholder="Email*"
                  readOnly={true}
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      email: e.target.value,
                    })
                  }
                />
                <div className="error">{error.email_error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="profile_email">Mobile Number</label>
                <input
                  type="number"
                  id="mobile_number"
                  className="form-input"
                  name="mobile_number"
                  placeholder="(+91)"
                  readOnly={!editable}
                  maxLength={10}
                  onInput={maxLengthCheck}
                  value={userInfo.mobile}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      mobile: e.target.value,
                    })
                  }
                />
                <div className="error">{error.mobile_error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="birthday">BirthDay</label>
                <input
                  type="date"
                  id="birthday"
                  className="form-input"
                  name="birthday"
                  readOnly={!editable}
                  value={userInfo.dob}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      dob: e.target.value,
                    })
                  }
                />
                <div className="error">{error.dob_error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  disabled={!editable}
                  value={userInfo.gender}
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
                </select>
                <div className="error">{error.gender_error}</div>
              </div>
            </div>
            <div className="user-form-container">
              <div className="form-group">
                <label htmlFor="personal_address">Personal Address</label>
                <textarea
                  name="personal_address"
                  id="personal_address"
                  readOnly={!editable}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      personal_address: e.target.value,
                    })
                  }
                  value={userInfo.personal_address}
                ></textarea>
                <div className="error">{error.personal_address_error}</div>
              </div>
              <div className="form-group">
                <label htmlFor="institute_address">Institute Address</label>
                <textarea
                  name="institute_address"
                  id="institute_address"
                  readOnly={!editable}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      institute_address: e.target.value,
                    })
                  }
                  value={userInfo.institute_address}
                ></textarea>
                <div className="error">{error.institute_address_error}</div>
              </div>
            </div>

            <div className="profile_button_container">
              {!editable && <p onClick={makeFieldEditable}>Edit Information</p>}
              {editable && <p onClick={makeFieldEditable}>Close</p>}
              {editable && (
                <Button btnColor="primary" content="Submit" btnType="submit" />
              )}
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
