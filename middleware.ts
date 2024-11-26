import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { refreshAccessToken } from '@/utils/refreshAccessToken'; 

export async function middleware(request: NextRequest) {
  // Lấy cookie accessToken
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // Danh sách các route mà người dùng cần phải đăng nhập
  const protectedRoutes = ['/dashboard', '/profile', '/carts'];

  // Kiểm tra xem người dùng có accessToken hay không
  if (!accessToken && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu người dùng đã đăng nhập và cố gắng truy cập trang đăng nhập hoặc đăng ký
  if (accessToken && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Nếu không có accessToken, nhưng có refreshToken, cần refresh token
  if (!accessToken && refreshToken) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      const response = NextResponse.next();
      response.cookies.set('accessToken', newToken);
      return response;
    } else {
      // Nếu không có token mới, chuyển hướng về trang đăng nhập
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard', '/profile', '/carts'],
};
