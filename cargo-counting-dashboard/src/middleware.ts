import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {

  console.log("Me runs everytime...")
  if (request.nextUrl.pathname.startsWith('/create-po')) {
    
    
    
  }

  if (request.nextUrl.pathname.startsWith('/live')) {
  
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/live', '/create-po', '/'],
}
