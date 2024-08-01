"use client";

//* Importing Components
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

//* css
import Style from "@/components/Resources/K12ResourcesTabs/K12ResourcesTabs.module.css";

//* Images
import BooksIcon from "@/images/categories/books.png";
import BooksActiveIcon from "@/images/categories/books-active.png";
import AudioBooksIcon from "@/images/categories/audio.png";
import AudioActiveBooksIcon from "@/images/categories/audio-active.png";
import VideoIcon from "@/images/categories/videos.png";
import VideoActiveIcon from "@/images/categories/video-active.png";
import ClassNotesIcon from "@/images/categories/class-notes.png";
import ClassNotesActiveIcon from "@/images/categories/class-notes-active.png";
import ArVrIcon from "@/images/categories/ar.png";
import ArVrActiveIcon from "@/images/categories/ar-active.png";
import GamifiedIcon from "@/images/categories/gaming.png";
import GamifiedActiveIcon from "@/images/categories/games-active.png";

const K12ResourcesTabs = () => {
  const pathname = usePathname();

  return (
    <div className={Style.resources_tabs_section}>
      <div className="app-container">
        <div className={Style.resources_tab_container}>
          <Link
            href="/k12-resources/books"
            className={
              pathname.includes("/k12-resources/book")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/k12-resources/book")
                  ? BooksActiveIcon
                  : BooksIcon
              }
              alt="Books"
            />
            <p>BOOKS</p>
          </Link>
          <Link
            href="/k12-resources/audio-books"
            className={
              pathname.includes("/k12-resources/audio-books")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/k12-resources/audio-books")
                  ? AudioActiveBooksIcon
                  : AudioBooksIcon
              }
              alt="AUDIO BOOKS"
            />
            <p>AUDIO BOOKS</p>
          </Link>
          <Link
            href="/k12-resources/videos"
            className={
              pathname.includes("/k12-resources/videos")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/k12-resources/videos")
                  ? VideoActiveIcon
                  : VideoIcon
              }
              alt="VIDEOS"
            />
            <p>VIDEOS</p>
          </Link>
          <Link
            href="/k12-resources/class-notes"
            className={
              pathname.includes("/k12-resources/class-notes")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/k12-resources/class-notes")
                  ? ClassNotesActiveIcon
                  : ClassNotesIcon
              }
              alt="CLASS NOTES"
            />
            <p>CLASS NOTES</p>
          </Link>
          <Link
            href="/k12-resources/ar-vr"
            className={
              pathname.includes("/k12-resources/ar-vr")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/k12-resources/ar-vr")
                  ? ArVrActiveIcon
                  : ArVrIcon
              }
              alt="AR / VR"
            />
            <p>AR / VR</p>
          </Link>
          <Link
            href="/k12-resources/gamified-learning"
            className={
              pathname.includes("/k12-resources/gamified-learning")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/k12-resources/gamified-learning")
                  ? GamifiedActiveIcon
                  : GamifiedIcon
              }
              alt="GAMIFIEDLEARNING"
            />
            <p>GAMIFIED LEARNING</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default K12ResourcesTabs;
