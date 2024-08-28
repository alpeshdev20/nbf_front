"use client";

//* Importing Component
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

//*Importing css
import Style from "@/components/layout/Footer/Footer.module.css";

//* Importing Images
import Logo from "@/public/logo.png";
import Linkedin from "@/images/footer/linkedin.png";
import Twiiter from "@/images/footer/twitter.png";
import Instagram from "@/images/footer/instagram.png";
import AppleStore from "@/images/footer/app-store.png";
import PlayStore from "@/images/footer/play-store.png";
import Email from "@/images/footer/email.png";
import Mobile from "@/images/footer/phone.png";
import GoToTop from "@/images/footer/up-arrow.png";
import AISearch from "@/icons/ai-search.png";

const Footer: React.FC = () => {
  const pathName = usePathname();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className={Style.footer}>
        <div className="app-container">
          <div className={Style.footer_cotainer}>
            <div className={Style.go_to_top} onClick={goToTop}>
              <Image src={GoToTop} alt="Go To top" />
            </div>

            <div className={Style.brand_information}>
              <div className={Style.brand_logo}>
                <Image src={Logo} alt="Logo" priority />
                <p>STREAM UNLIMITED KNOWLEDGE</p>
              </div>
              <div className={Style.social_media}>
              <Link
                  href="https://www.linkedin.com/company/netbookflix-learning-resource-pvt-ltd/"
                  target="_blank"
                >
                  <Image src={Linkedin} alt="Linkedin" />
                </Link>
                <Link href="https://twitter.com/netbookflix " target="_blank">
                  <Image src={Twiiter} alt="Twiiter" />
                </Link>
                <Link
                  href="https://www.instagram.com/netbookflix/"
                  target="_blank"
                >
                  <Image src={Instagram} alt="Instagram" />
                </Link>
              </div>
              <div className={Style.stores}>
                <Link href="/" target="_blank">
                  <Image src={AppleStore} alt="App Store" />
                </Link>
                <Link href="/" target="_blank">
                  <Image src={PlayStore} alt="Play Store" />
                </Link>
              </div>
            </div>

            <div className={Style.other_information}>
              <div className={Style.menu_container}>
                <Link href="/about-us">About Us</Link>
                <Link href="/netbookflix-for-publishers-authors">
                  Netbookflix for Publishers & Authors
                </Link>
                <Link href="/netbookflix-for-instructors">
                  Netbookflix for Instructors
                </Link>
                <Link href="/netbookflix-for-institutions">
                  Netbookflix for Institutions
                </Link>
              </div>

              <div className={Style.menu_container}>
                <Link href="/faqs">FAQs</Link>
                <Link href="/blogs">Blogs</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                {/* <Link href="/help-center">Help Center</Link> */}
                <Link href="/term-condition">Term & Condition</Link>
              </div>

              <div className={Style.contact_us}>
                <h6>CONTACT US</h6>
                <h6>Get In Touch With Us</h6>
                <div className={Style.contact_information}>
                  <Link href="tel:+9818195778">
                    <Image
                      src={Mobile}
                      alt="Mobile Icon"
                      width={33}
                      height={33}
                    />
                    +919821466399
                  </Link>

                  <Link href="mailto:support@netbookflix.com">
                    <Image
                      src={Email}
                      alt="Mobile Icon"
                      width={33}
                      height={23}
                    />
                    support@netbookflix.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={Style.footer_copyright_cotainer}>
            <p>Copyright &copy; 2024 NETBOOKFLIX. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {pathName !== "/naisa" && (
        <Link href="/naisa" className={Style.search_ai}>
          <Image src={AISearch} alt="Search AI" />
        </Link>
      )}
    </>
  );
};

export default Footer;
