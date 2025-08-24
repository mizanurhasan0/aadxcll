import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Check if user has a valid token in cookies
        const token = request.cookies.get('token')?.value;

        if (!token) {
            // Redirect to auth page if no token
            return NextResponse.redirect(new URL('/auth', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};
