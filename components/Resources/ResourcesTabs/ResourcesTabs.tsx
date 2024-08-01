"use client";

//* Importing Components
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

//* css
import Style from "@/components/Resources/ResourcesTabs/ResourcesTabs.module.css";

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

const ResourcesTabs = () => {
  const pathname = usePathname();

  return (
    <div className={Style.resources_tabs_section}>
      <div className="app-container">
        <div className={Style.resources_tab_container}>
          <Link
            href="/resources/books"
            className={
              pathname.includes("/resources/book")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/resources/book")
                  ? BooksActiveIcon
                  : BooksIcon
              }
              alt="Books"
            />
            <p>BOOKS</p>
          </Link>
          <Link
            href="/resources/audio-books"
            className={
              pathname.includes("/resources/audio-books")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/resources/audio-books")
                  ? AudioActiveBooksIcon
                  : AudioBooksIcon
              }
              alt="AUDIO BOOKS"
            />
            <p>AUDIO BOOKS</p>
          </Link>
          <Link
            href="/resources/videos"
            className={
              pathname.includes("/resources/videos")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/resources/videos")
                  ? VideoActiveIcon
                  : VideoIcon
              }
              alt="VIDEOS"
            />
            <p>VIDEOS</p>
          </Link>
          <Link
            href="/resources/class-notes"
            className={
              pathname.includes("/resources/class-notes")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/resources/class-notes")
                  ? ClassNotesActiveIcon
                  : ClassNotesIcon
              }
              alt="CLASS NOTES"
            />
            <p>CLASS NOTES</p>
          </Link>
          <Link
            href="/resources/ar-vr"
            className={
              pathname.includes("/resources/ar-vr")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/resources/ar-vr")
                  ? ArVrActiveIcon
                  : ArVrIcon
              }
              alt="AR / VR"
            />
            <p>AR / VR</p>
          </Link>
          <Link
            href="/resources/gamified-learning"
            className={
              pathname.includes("/resources/gamified-learning")
                ? `${Style.resource_tab} ${Style.active_resource_tab}`
                : Style.resource_tab
            }
          >
            <Image
              src={
                pathname.includes("/resources/gamified-learning")
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

export default ResourcesTabs;
