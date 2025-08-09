import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAccountActiveEmail, getAccountActivePage } from "./services/account-active/account_active";
import { getResetPasswordEmail, getResetPasswordPage } from "./services/reset-password/reset_password";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const accessToken = request.cookies.get("accessToken")?.value;
    const token = url.searchParams.get("token");

    if (url.pathname === "/account-active" || url.pathname === "/account-active/sent") {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (url.pathname === "/account-active/sent") {
            const response = await getAccountActivePage(token as string);
            if (response.status !== 200) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        if (url.pathname === "/account-active") {
            const response = await getAccountActiveEmail(token as string);
            if (response.status !== 200) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }


    if (url.pathname === '/reset-password/sent' || url.pathname === '/reset-password/user') {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (url.pathname === "/reset-password/sent") {
            const response = await getResetPasswordPage(token as string);
            if (response.status !== 200) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        if (url.pathname === "/reset-password/user") {
            const response = await getResetPasswordEmail(token as string);
            if (response.status !== 200) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }
}

export const config = {
    matcher: ["/account-active/:path*", "/login", "/register", "/reset-password/:path*"],
}
