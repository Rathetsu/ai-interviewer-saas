import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
	// First update the session
	const response = await updateSession(request);

	// Get the pathname
	const pathname = request.nextUrl.pathname;

	// Check if it's an auth route (sign-in, sign-up, etc.)
	const isAuthRoute =
		pathname.startsWith("/sign-in") ||
		pathname.startsWith("/sign-up") ||
		pathname.startsWith("/forgot-password") ||
		pathname.startsWith("/email-verification");

	// Create a Supabase client
	const supabase = await createClient();

	// Get the user session
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// If user is authenticated and trying to access auth routes, redirect to home
	if (user && isAuthRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// If user is not authenticated and trying to access protected routes, redirect to sign-in
	// Note: reset-password is not protected as it's part of the password reset flow
	if (!user && !isAuthRoute && !pathname.startsWith("/reset-password")) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
