import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse, type NextRequest } from "next/server";

const locales = ["fr", "ar", "en"] as const;
const defaultLocale = "fr" as const;

function getLocale(request: NextRequest): string {
  const headers = { "accept-language": request.headers.get("accept-language") ?? "fr" };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales as unknown as string[], defaultLocale);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|.*\\.).*)"],
};
