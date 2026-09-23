// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const user = request.cookies.get("user")?.value;
  const { pathname } = request.nextUrl;
  // Auth routes that should NOT be accessible when logged in
  const authRoutes = [
    "/login",
    "/signup",
    "/update-password",
    "/otp",
    "/forgot-password",
  ];
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "?")
  );

  // Protected routes that require authentication
  const loginURL = new URL("/login", request.url);
  const dashboardURL = new URL("/dashboard", request.url);
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If trying to access auth route while logged in - redirect to dashboard
  if (user && isAuthRoute) {
    return NextResponse.redirect(dashboardURL);
  }

  // If no token and trying to access protected route - redirect to login
  if (!user && isProtectedRoute) {
    loginURL.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Run on all routes except static files
};
