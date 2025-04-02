"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
	return z.object({
		name:
			type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(8),
	});
};

const AuthForm = ({ type }: { type: FormType }) => {
	const formSchema = authFormSchema(type);
	// Define the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// Submit handler
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		// toast.error("There was an error");
		try {
			if (type === "sign-up") {
				console.log("SIGN UP", values);
			} else {
				console.log("SIGN IN", values);
			}
		} catch (err) {
			if (err instanceof Error) {
				console.log("Form error: ", err);
				toast.error(`There was an error: ${err.message}`);
			} else {
				console.log("Unknown form error: ", err);
				toast.error("An unknown error occurred.");
			}
		}
	};

	const isSignIn = type === "sign-in";

	return (
		<div className="card-border lg:min-w-[566px]">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<div className="flex flex-row gap-2 justify-center">
					<Image src="/logo.svg" alt="logo" width={900} height={400} />
				</div>
				<h3 className="text-center">Practice Job interivews with AI</h3>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-6 mt-4 form"
					>
						{!isSignIn && (
							<FormField
								control={form.control}
								name="name"
								label="Name"
								placeholder="Your name"
							/>
						)}
						<FormField
							control={form.control}
							name="email"
							label="Email"
							type="email"
							placeholder="Your email address"
						/>
						<FormField
							control={form.control}
							name="password"
							label="Password"
							type="password"
							placeholder="Enter your password"
						/>
						<Button className="btn" type="submit">
							{isSignIn ? "Sign in" : "Create an accout"}
						</Button>
					</form>
				</Form>

				<p className="text-center">
					{isSignIn ? "Don't have an account?" : "Already have an account?"}

					<Link
						href={!isSignIn ? "/sign-in" : "/sign-up"}
						className="font-bold text-user-primary ml-1"
					>
						{isSignIn ? "Sign up" : "Sign in"}
					</Link>
				</p>
			</div>
		</div>
	);
};

export default AuthForm;
