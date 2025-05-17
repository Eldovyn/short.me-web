import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "./lib/axios";
import { AxiosError } from "axios";

interface ErrorResponse {
    message: string;
    errors?: {
        [field: string]: string[];
    };
}

const getAccountActivePage = async (token: string) => {
    try {
        const response = await axiosInstance.get('/short.me/account-active/email-verification', {
            headers: { "Content-Type": "application/json" }, params: { token }
        })
        return response.data?.data
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>
        console.error('Terjadi kesalahan:', error);
    }
}

const getAccountActiveEmail = async (token: string) => {
    try {
        const response = await axiosInstance.get('/short.me/account-active/verification/email-verification', {
            headers: { "Content-Type": "application/json" }, params: { token }
        })
        return response.data?.data
    } catch (err) {
        const error = err as AxiosError<ErrorResponse>
        console.error('Terjadi kesalahan:', error);
    }
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const accessToken = request.cookies.get("accessToken")?.value;

    if (url.pathname === '/account-active' || url.pathname === '/account-active/sent') {
        const token = url.searchParams.get("token");
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (url.pathname === '/account-active/sent') {
            const getAccountActive = await getAccountActivePage(token || "");
            if (!getAccountActive) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        if (url.pathname === '/account-active') {
            const getAccountActive = await getAccountActiveEmail(token || "");
            if (!getAccountActive) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }

    if (url.pathname === '/login' || url.pathname === '/register') {
        if (accessToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}