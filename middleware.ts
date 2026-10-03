import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Allow all traffic for Roamwise demo
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
