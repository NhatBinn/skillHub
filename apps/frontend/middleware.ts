// Middleware tạm thời — auth sẽ được setup sau
// TODO: Thêm middleware check session/role sau khi tự xây dựng auth

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
