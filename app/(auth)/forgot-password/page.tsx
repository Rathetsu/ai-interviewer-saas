"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const forgotPasswordSchema = z.object({
	email: z.string().email(),
});

export default function ForgotPasswordPage() {
	const [mounted, setMounted] = useState(false);
	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
		try {
			const supabase = createClient();
			const origin = window.location.origin;
			const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
				redirectTo: `${origin}/reset-password`,
			});

			if (error) {
				toast.error(error.message);
				return;
			}

			toast.success(
				"If an account exists with this email, you will receive a password reset link."
			);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(`There was an error: ${err.message}`);
			} else {
				toast.error("An unknown error occurred.");
			}
		}
	};

	if (!mounted) {
		return null;
	}

	return (
		<div className="card-border lg:min-w-[566px] lg:max-w-[566px] lg:mx-auto">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex justify-center w-full">
					<div className="w-[200px] relative">
						<Image
							src="/logo.svg"
							alt="logo"
							width={200}
							height={40}
							className="object-contain"
						/>
					</div>
				</div>

				<div className="flex flex-col items-center gap-4 text-center">
					<h2 className="text-2xl font-bold">Reset your password</h2>
					<p className="text-muted-foreground">
						Enter your email address and we'll send you a link to reset your
						password.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-4"
					>
						<FormField
							control={form.control}
							name="email"
							label="Email"
							type="email"
							placeholder="Your email address"
						/>
						<Button
							className="w-full bg-white text-black hover:bg-gray-100"
							type="submit"
						>
							Send reset link
						</Button>
					</form>
				</Form>

				<div className="flex justify-center">
					<Button variant="link" asChild>
						<Link href="/sign-in" className="text-muted-foreground">
							Back to Sign In
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
