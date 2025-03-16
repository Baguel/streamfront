import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request) {
    const accessToken = request.cookies.get("token")?.value;
    if(!accessToken) {
            return NextResponse.redirect(new URL('/login', request.url))
    } else {
        await fetch("http://localhost:3001/user/user", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${accessToken}` },
        }).then(response => {
            if (response.statusText) {
                return NextResponse.next();
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/favorite/:path*', '/moviedetail/:path*', '/update/:path*'],
}