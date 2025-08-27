import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;

  // 인증 없이 접근 가능한 퍼블릭 경로들
  const publicRoutes = ['/signin', '/shopby-test'];
  const isPublicRoute = publicRoutes.includes(pathname);

  // 퍼블릭 경로가 아니면 프라이빗 경로로 간주
  const isPrivateRoute = !isPublicRoute;

  // 로그인 페이지인지 확인
  const isSigninPage = pathname === '/signin';

  // 루트 경로 접근 시 처리
  if (pathname === '/') {
    if (accessToken) {
      // 토큰이 있으면 대시보드로 리다이렉트
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  // 토큰이 없는데 private 경로에 접근하는 경우
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 토큰이 있는데 로그인 페이지에 접근하는 경우
  if (accessToken && isSigninPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Next.js 15 권장 matcher 설정
export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 요청 경로에 대해 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
