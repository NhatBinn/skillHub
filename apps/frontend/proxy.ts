import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  console.log(req.auth);

  // const isLogin = !!req.auth;
  // const isAuthPage =
  //   req.nextUrl.pathname.startsWith("/sign-in") ||
  //   req.nextUrl.pathname.startsWith("/sign-up");

  // if (!isLogin && !isAuthPage)
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // else if (isLogin && isAuthPage)
  //   return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
