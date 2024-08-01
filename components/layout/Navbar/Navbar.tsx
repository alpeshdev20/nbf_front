"use client";

//* Components
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/providers/SessionProvider";

//* Images
import Logo from "@/public/logo.png";

//* Importing icon
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import UserIcon from "@/icons/user.png";

//* CSS
import Style from "./Navbar.module.css";

//* Interface
interface NavbarInterface {
  navType: "home" | "main" | "k12";
  btnClass: "primary" | "secondary" | "third";
  btnURL: string;
  btnContent: string;
}

const Navbar: React.FC<NavbarInterface> = ({
  navType,
  btnClass,
  btnURL,
  btnContent,
}) => {
  const pathname = usePathname();

  const [navbar, setNavbar] = useState(false);

  //* Navbar Fixed
  const [navbarFixed, setNavbarFixed] = useState(false);

  function navbarFixedTop() {
    let windowHeight = window.scrollY;
    windowHeight > 0 ? setNavbarFixed(true) : setNavbarFixed(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", navbarFixedTop);
  }, []);

  //* handle Navnar
  const handleNavbar = () => {
    setNavbar(!navbar);
  };

  const [isIndia, setIsIndia] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (localStorage.getItem("country") === null) {
        try {
          const response = await fetch(`/api/get-country`);
          if (response.ok) {
            const data = await response.json();
            setIsIndia(data.country === "India");
            localStorage.setItem("country", data.country);
          } else {
            setIsIndia(false);
          }
        } catch (error) {
          setIsIndia(false);
        }
      } else {
        const country = localStorage.getItem("country");
        if (country === "India") {
          setIsIndia(true);
        } else {
          setIsIndia(false);
        }
      }
    };

    fetchCountryInfo();
  }, []);

  //* Session Values

  const { session, isLoading } = useSession();

  return (
    <>
      <header
        className={`${Style.navbar} ${
          navType === "k12"
            ? `${Style.k12_navbar} ${Style.transparent_navbar}`
            : ""
        } ${
          navType === "home"
            ? `${Style.home_navbar} ${Style.transparent_navbar}`
            : ""
        } 
        ${navbarFixed ? Style.navbar_fixed : ""}`}
      >
        <div className={Style.navbar_container}>
          <div className={Style.brand}>
            <Link href="/">
              <Image src={Logo} alt="Netbookflix" priority={true} />
            </Link>

            <div className={Style.nav_icons}>
              <GiHamburgerMenu
                className={
                  !navbar ? Style.hamburger : `${Style.hamburger} d-none`
                }
                onClick={handleNavbar}
              />

              <IoClose
                className={navbar ? Style.close : `${Style.close} d-none`}
                onClick={handleNavbar}
              />
            </div>

            {isIndia && (
              <Link
                href={btnURL}
                className={`${Style.show_desktop} btn ${btnClass}`}
              >
                {btnContent}
              </Link>
            )}
          </div>

          <ul
            className={
              navbar ? `${Style.navbar_nav} ${Style.show}` : Style.navbar_nav
            }
          >
            <div className={Style.menus}>
              <li className={`${Style.nav_menu} ${Style.show_mobile}`}>
                <Link href={btnURL}>{btnContent}</Link>
              </li>

              {!isLoading && !session?.isLoggedIn && (
                <>
                  <li className={Style.nav_menu}>
                    <Link
                      href={
                        pathname === "/explore-k12"
                          ? "/log-in?src=k12"
                          : "/log-in"
                      }
                    >
                      LOG IN
                    </Link>
                  </li>
                  <li className={Style.nav_menu}>
                    <Link href="/sign-up">SIGN UP</Link>
                  </li>
                </>
              )}

              {!isLoading && session?.isLoggedIn && session && (
                <Link href="/user/profile" className={Style.user_profile}>
                  <Image alt="user icon" src={UserIcon} />
                  <div className={Style.user_info}>
                    <p>{session?.user?.name}</p>
                  </div>
                </Link>
              )}

              {!isLoading && !session?.isLoggedIn && (
                <li className={Style.nav_menu}>
                  <Link href="/plans">VIEW PLANS</Link>
                </li>
              )}
            </div>
            <li className={Style.nav_menu}>
              <Link href="/search">
                <FaSearch />
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
