import { NextResponse, type NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/create-po')) {
    
    
    
  }

  if (request.nextUrl.pathname.startsWith('/live')) {
  
  }

  if (request.nextUrl.pathname.startsWith('/ray-runtime')) {
     return NextResponse.rewrite('/public/images/atai_logo.svg')
    
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/live', '/create-po', '/','/ray-runtime'],
}
