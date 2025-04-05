"use server";

import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		if (error.message === "User already registered") {
			return {
				success: false,
				message: "Email already registered. Please sign in.",
			};
		}
		return {
			success: false,
			message: error.message,
		};
	}

	return {
		success: true,
		message: "Sign in successful",
	};
}

export async function signUp(formData: FormData) {
	const supabase = await createClient();

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		options: {
			data: {
				display_name: formData.get("name") as string,
			},
		},
	};

	const { error } = await supabase.auth.signUp(data);

	if (error) {
		if (error.message === "User already registered") {
			return {
				success: false,
				message: "Email already registered. Please sign in.",
			};
		}
		return {
			success: false,
			message: error.message,
		};
	}

	return {
		success: true,
		message: "Account created successfully. Please sign in.",
	};
}
