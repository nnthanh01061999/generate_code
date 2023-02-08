import { NextRequest, NextResponse } from 'next/server';
import { AUTH_DASHBOARD_PATH, AUTH_LOGIN_PATH } from '@/data';
import { AUTH_NAMESPACE } from '@/store/reducer/auth/authReducer';

export function middleware(request: NextRequest) {
    const state = request.cookies.get('state');
    const value = state?.value ? JSON.parse(state?.value) : undefined;
    const logged = value?.[AUTH_NAMESPACE]?.logged;

    if (logged && request.url.includes(AUTH_LOGIN_PATH)) {
        const url = request.nextUrl.clone();
        url.pathname = AUTH_DASHBOARD_PATH;
        return NextResponse.redirect(url);
    }

    if (!logged && request.url.includes(AUTH_DASHBOARD_PATH)) {
        const url = request.nextUrl.clone();
        url.pathname = AUTH_LOGIN_PATH;
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/auth/:path*'],
};
