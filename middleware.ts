import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the pathname starts with a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return NextResponse.next();

    // Skip for static files, API routes, and blog
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/blog') ||
        /\.[a-zA-Z0-9]+$/.test(pathname) // Files with extensions
    ) {
        return NextResponse.next();
    }

    // Redirect root and other paths to default locale
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    // Match all paths including root
    matcher: ['/', '/((?!_next|api|blog|.*\\.[\\w]+$).*)'],
};
