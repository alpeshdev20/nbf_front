import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/log-in",
  "/forgot-password",
  "/forgot-password/verify-otp",
  "/forgot-password/reset-password",
  "/forgot-password/reset-password",
  "/forgot-password/response-page",
  "/sign-up",
];

const naisaRoutes = ["/naisa"];

const userRoutes = [
  "/user/profile",
  "/user/payment-hisory",
  "/user/wishlists",
  "/user/library",
  "/user/change-password",
  "/user/cancel-subscription",
  "/resources/book/info",
  "/resources/videos/info",
  "/resources/class-notes/info",
  "/resources/audio-books/info",
];

const indianUserRoutes = ["/explore-k12"];

export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get("session")?.value;

  //* For Auth Routes
  const isAuthRoutes = authRoutes.includes(request.nextUrl.pathname);

  //! Checking routes in auth routes
  if (isAuthRoutes) {
    if (cookie) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      return;
    }
  }

  //* for naisa rooutes
  const isNaisaRoutes = naisaRoutes.includes(request.nextUrl.pathname);

  //! Checking naisa routes
  if (isNaisaRoutes) {
    if (cookie) {
      return;
    } else {
      return NextResponse.redirect(new URL("/log-in", request.nextUrl));
    }
  }

  //* for users routes
  const isUsersRoutes = userRoutes.includes(request.nextUrl.pathname);
  //! Checking users routes
  if (isUsersRoutes) {
    if (cookie) {
      return;
    } else {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  let country = "US";
  const response = await fetch(`http://ip-api.com/json`);
  if (response.ok) {
    const data = await response.json();
    country = data.country;
  }

  //* Indian Routes
  const IndiaRoutes = indianUserRoutes.includes(request.nextUrl.pathname);
  //! Checking routes for India or not
  if (IndiaRoutes) {
    if (country !== "India") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    } else {
      return;
    }
  }
}

// export const config = {
//   matcher: [
//     "/log-in",
//     "/forgot-password",
//     "/forgot-password/verify-otp",
//     "/forgot-password/reset-password",
//     "/forgot-password/reset-password",
//     "/forgot-password/response-page",
//     "/sign-up",
//     "/user/:path*",
//     "/resources/book/info",
//     "/resources/videos/info",
//     "/resources/class-notes/info",
//     "/resources/audio-books/info",
//     "/naisa",
//   ],
// };
