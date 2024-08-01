//* Components
import React, { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import NaisaSearchCard from "@/components/Resources/NaisaSearchCard/NaisaSearchCard";

//* interface
// interface NaisaInterface {
//   isLogin?: boolean;
// }

//* icons
import { FaEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

//* images
import DefaultResourceImage from "@/images/common/recommendation.png";

const Naisa = () => {
  return (
    <>
      {/* Navbar  */}
      <Navbar
        navType="main"
        btnClass="primary"
        btnURL="/explore-k12"
        btnContent="EXPLORE K12/SCHOOL"
      />

      <section className="naisa_section">
        <div className="app-container">
          <div className="naisa_container">
            {/* Naisa Sidebar  */}
            <div className="naisa_sidebar">
              {/* New Chat  */}
              <div className="new_chat_button_container">
                <div className="new_chat_button">
                  <p>New Chat</p> <FaEdit />
                </div>
              </div>

              {/* Search Container  */}
              <div className="naisa_search_history_container">
                <h5>SEARCHED TOPICS</h5>

                {/* Search History  */}
                <div className="naisa_search_history">
                  <div className="naisa_search_card naisa_active_search">
                    <p>Definition of marginal utility...</p>
                  </div>

                  <div className="naisa_search_card">
                    <p>Definition of marginal utility...</p>
                  </div>

                  <div className="naisa_search_card">
                    <p>Definition of marginal utility...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Result Page  */}
            <div className="naisa_search_result_page">
              <div className="naisa_search_result_container">
                {/* Search Heading  */}
                <div className="naisa_search_result_heading">
                  <p>
                    N<b>AI</b>SA
                  </p>
                </div>

                {/* Search Result body */}

                <div className="naisa_search_result_body">
                  {/* user Question  */}
                  <div className="naisa_user_search_question_card">
                    <h5>USER</h5>
                    <p>Definition of marginal utility</p>
                  </div>

                  {/* Result Question  */}
                  <div className="naisa_user_search_result">
                    <div className="naisa_user_search_result_text">
                      <p>
                        N<b>AI</b>SA
                      </p>
                      <p>
                        Marginal utility is a concept in economics that refers
                        to the additional satisfaction or benefit that a
                        consumer derives from consuming one more unit of a good
                        or service. It is based on the principle of diminishing
                        marginal utility, which suggests that as a person
                        consumes more of a good or service, the additional
                        satisfaction or benefit (marginal utility) from each
                        additional unit tends to decrease.
                      </p>
                    </div>

                    <div className="search_result_resource_suggestion">
                      <NaisaSearchCard
                        image={DefaultResourceImage}
                        author="By Richard Osman"
                        title="The Swallows"
                        rating={4}
                        totalReviews={6}
                        resourceUrl="/log-in"
                        resourceType="Class Notes"
                        btnContext="READ NOW"
                      />

                      <NaisaSearchCard
                        image={DefaultResourceImage}
                        author="By Richard Osman"
                        title="The Swallows"
                        rating={4}
                        totalReviews={6}
                        resourceUrl="/log-in"
                        resourceType="Class Notes"
                        btnContext="READ NOW"
                      />

                      <NaisaSearchCard
                        image={DefaultResourceImage}
                        author="By Richard Osman"
                        title="The Swallows"
                        rating={4}
                        totalReviews={6}
                        resourceUrl="/log-in"
                        resourceType="Class Notes"
                        btnContext="READ NOW"
                      />

                      <NaisaSearchCard
                        image={DefaultResourceImage}
                        author="By Richard Osman"
                        title="The Swallows"
                        rating={4}
                        totalReviews={6}
                        resourceUrl="/log-in"
                        resourceType="Class Notes"
                        btnContext="READ NOW"
                      />
                      <NaisaSearchCard
                        image={DefaultResourceImage}
                        author="By Richard Osman"
                        title="The Swallows"
                        rating={4}
                        totalReviews={6}
                        resourceUrl="/log-in"
                        resourceType="Class Notes"
                        btnContext="READ NOW"
                      />
                    </div>
                  </div>
                </div>

                <div className="naisa_search_result_body naisa-no-result">
                  <h5>How can I help you today?</h5>
                </div>
              </div>

              <div className="naisa_ask_question_container">
                <div className="ask_questions">
                  <input
                    type="text"
                    name="ask_question"
                    id="ask_question"
                    placeholder="Ask Naisa"
                  />
                  <div className="naisa_submit_button">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer  */}
      <Footer />
    </>
  );
};

export default Naisa;
