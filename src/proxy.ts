import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keep every previously public document route on the temporary maintenance
 * page, without redirecting visitors or interfering with app/API endpoints
 * and the static assets the page needs to render.
 */
export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icons/|favicon.ico|robots.txt|sitemap.xml|.*(?:opengraph-image|twitter-image|apple-icon)(?:/|$)|.*\\.(?:svg|png|jpg|jpeg|webp|ico|xml|txt)$).*)",
  ],
};
