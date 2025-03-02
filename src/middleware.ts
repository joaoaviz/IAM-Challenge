import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
  // Get the current user from cookies
  const currentUser = request.cookies.get('currentUser')?.value

  // Get the pathname
  const pathname = request.nextUrl.pathname

  // If trying to access login page while logged in, redirect to dashboard
  if (pathname === '/login' && currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // List of paths that require authentication
  const protectedPaths = ['/dashboard', '/admin', '/logs', '/win', '/course']

  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  // If trying to access admin without being logged in, unlock achievement
  if (pathname.startsWith('/admin') && !currentUser) {
    // Create response to redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // Set a cookie to indicate the achievement should be unlocked
    response.cookies.set('unlock_straight_to_point', 'true', {
      path: '/',
      maxAge: 60 * 5 // 5 minutes expiry
    })
    
    return response
  }

  // If path requires auth and user is not logged in, redirect to login
  if (isProtectedPath && !currentUser) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Special handling for admin page
  if (pathname.startsWith('/admin')) {
    // If user is exalt, set cookie to unlock path_finder achievement
    if (currentUser?.toLowerCase() === 'exalt') {
      const response = NextResponse.next()
      response.cookies.set('unlock_path_finder', 'true', {
        path: '/',
        maxAge: 60 * 5 // 5 minutes expiry
      })
      return response
    }

    // Only allow access if logged in as a boss or if manually navigating as exalt
    const allowedUsers = ['Morgan', 'Elodie', 'exalt']
    if (!allowedUsers.includes(currentUser || '')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/logs/:path*',
    '/win/:path*',
    '/course/:path*',
    '/login',
  ],
} 