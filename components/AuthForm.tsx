"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
	username: z.string().min(2).max(50),
});

const AuthForm = ({ type }: { type: FormType }) => {
	// Define the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	// Submit handler.
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
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
						{!isSignIn && <p>Name</p>}
						<p>Email</p>
						<p>Password</p>
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
