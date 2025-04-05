"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { resendVerificationEmail } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

const resendEmailSchema = z.object({
	email: z.string().email(),
});

const EmailVerificationPage = () => {
	const [isResending, setIsResending] = useState(false);
	const [mounted, setMounted] = useState(false);

	const form = useForm<z.infer<typeof resendEmailSchema>>({
		resolver: zodResolver(resendEmailSchema),
		defaultValues: {
			email: "",
		},
	});

	useEffect(() => {
		setMounted(true);

		// Check if user is already authenticated
		const checkAuth = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			// If user is authenticated, redirect to home
			if (user) {
				redirect("/");
			}
		};

		checkAuth();
	}, []);

	const onSubmit = async (data: z.infer<typeof resendEmailSchema>) => {
		try {
			setIsResending(true);
			const formData = new FormData();
			formData.append("email", data.email);

			const result = await resendVerificationEmail(formData);

			if (result.success) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} catch (err) {
			if (err instanceof Error) {
				toast.error(`There was an error: ${err.message}`);
			} else {
				toast.error("An unknown error occurred.");
			}
		} finally {
			setIsResending(false);
		}
	};

	if (!mounted) {
		return null;
	}

	return (
		<div className="card-border lg:min-w-[700px] lg:max-w-[700px] lg:mx-auto">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image
						src="/logo.svg"
						alt="logo"
						width={900}
						height={400}
						className="object-contain"
					/>
				</div>
				<div className="flex flex-col gap-6 card py-14 px-10">
					<div className="flex flex-col items-center gap-4 text-center">
						<h2 className="text-2xl font-bold">Check your email</h2>
						<p className="text-muted-foreground">
							We've sent you a verification link to your email address.
							<br /> Please check your inbox and click the link to verify your
							account.
						</p>

						<div className="mt-4 p-4 bg-[#27282F] rounded-lg w-full">
							<p className="text-sm">
								<strong>Didn't receive the email?</strong>
								<br /> Check your spam folder or resend the verification email
								below.
							</p>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full space-y-4 mt-2"
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
									disabled={isResending}
								>
									{isResending ? "Sending..." : "Resend verification email"}
								</Button>
							</form>
						</Form>

						<div className="flex flex-row justify-center w-full gap-4 mt-4 px-1.5">
							<Button
								className="w-[50%] bg-white text-black hover:bg-gray-100"
								asChild
							>
								<Link href="/sign-in">Back to Sign In</Link>
							</Button>
							<Button
								className="w-[50%] bg-[#27282F] text-white hover:bg-[#1d1e23]"
								asChild
							>
								<Link href="/sign-up">Create another account</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailVerificationPage;
