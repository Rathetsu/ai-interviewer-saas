import AuthForm from "@/components/AuthForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
	// Check if user is already authenticated
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// If user is authenticated, redirect to home
	if (user) {
		redirect("/");
	}

	return <AuthForm type="sign-in" />;
}
