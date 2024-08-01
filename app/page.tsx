//* Importing Component
import Navbar from "@/components/layout/Navbar/Navbar";
import Image from "next/image";
import Naisa from "@/components/ExploreNaisa/Naisa";
import SubscriptionWithCategory from "@/components/SubscriptionWithCategory/SubscriptionWithCategory";
import Partners from "@/components/sliders/Partners/Partners";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import Footer from "@/components/layout/Footer/Footer";
import Testimonials from "@/components/sliders/Testimonials/Testimonials";
import RecommandationHome from "@/components/sliders/RecommandationHome/RecommandationHome";
import Link from "next/link";

//* Importing Image
import FreeTrail from "@/icons/free-trial.png";
import Banner from "@/images/home/banner.png";
import TickIcon from "@/icons/tick.png";

//* importing Icons
import { FaSearch } from "react-icons/fa";

export default function Home() {
  return (
    <>
      {/* navbar  */}
      <div className="fiexd-navbar">
        <Navbar
          navType="home"
          btnClass="primary"
          btnURL="/explore-k12"
          btnContent="EXPLORE K12/SCHOOL"
        />
      </div>
      <section className="home-banner-section">
        <div className="home-banner-container">
          <div className="app-container">
            <div className="home-banner-content">
              <h2>STREAM UNLIMITED</h2>
              <h6>KNOWLEDGE</h6>
              <p>
                <b>READ TOPICALLY</b> from collection of over 05 million+ pages
              </p>
              <p>
                of credible content. <b>TRUSTED</b> by students worldwide.
              </p>
              <div className="home-ai-search">
                <div className="home-ai-search-addon">
                  <span>AI Search</span>
                </div>
                <div className="home-ai-search-input">
                  <input
                    type="search"
                    name="ai-search"
                    id="ai-search"
                    className="form-input"
                    placeholder="Type your search here"
                  />
                </div>
                <div className="home-ai-search-icon">
                  <FaSearch />
                </div>
              </div>
              <p>Anywhere, Anytime</p>
              <Link href="/sign-up">
                <Image
                  src={FreeTrail}
                  width={351}
                  height={158}
                  priority
                  alt="Free Trail image"
                />
              </Link>
            </div>
          </div>
          <div className="home-banner-image">
            <Image src={Banner} alt="Banner" priority />
          </div>
        </div>
      </section>

      {/* Banner  */}

      <div className="home-features-section">
        {/* Explore  naisa  */}
        <Naisa />

        {/* subscriptions */}
        <SubscriptionWithCategory bgType="higher-edu" icon={TickIcon} />

        {/* Partners  */}
        <Partners />
      </div>

      {/* Recommandation  */}
      <RecommandationHome />

      {/* Testimonials  */}
      <Testimonials />

      {/* News Letter  */}
      <NewsLetter />

      {/* Footer  */}
      <Footer />
    </>
  );
}
