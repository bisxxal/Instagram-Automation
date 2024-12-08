import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/api/payment(.*)',
    '/callback(.*)',
])
// export default clerkMiddleware();
export default clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect()
    }
  })
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};