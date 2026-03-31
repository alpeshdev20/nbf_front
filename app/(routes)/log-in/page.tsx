import React, { Suspense } from "react";
import Meta from "../../meta"; // Import the Meta component
import LoginForm from "./Login"

const LogIn = () => {
  const metaData = {
    title: "Log In to NetbookFlix: Access Your Educational Resources",
    description:
      "Log in to your NetbookFlix account to access innovative educational tools, resources, and personalized content for enhanced learning experience",
    ogDescription:
      "Log in to your NetbookFlix account to access innovative educational tools, resources, and personalized content for enhanced learning experience",
  };

  return (
    <>
      <Meta
        title={metaData.title}
        description={metaData.description}
        ogDescription={metaData.ogDescription}
      />

      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
};

export default LogIn;
