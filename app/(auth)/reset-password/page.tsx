"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const resetPasswordSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export default function ResetPasswordPage() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
		try {
			setIsSubmitting(true);
			const supabase = createClient();
			const { error } = await supabase.auth.updateUser({
				password: data.password,
			});

			if (error) {
				toast.error(error.message);
				return;
			}

			toast.success("Password updated successfully!");
			router.push("/sign-in");
		} catch (err) {
			if (err instanceof Error) {
				toast.error(`There was an error: ${err.message}`);
			} else {
				toast.error("An unknown error occurred.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

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
					<h2 className="text-2xl font-bold">Set new password</h2>
					<p className="text-muted-foreground">
						Please enter your new password below.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-4"
					>
						<FormField
							control={form.control}
							name="password"
							label="New Password"
							type="password"
							placeholder="Enter your new password"
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							placeholder="Confirm your new password"
						/>
						<Button
							className="w-full bg-white text-black hover:bg-gray-100"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Updating password..." : "Update Password"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
