"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
	return z
		.object({
			name:
				type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
			email: z.string().email(),
			password: z.string().min(8),
			...(type === "sign-up" && {
				confirmPassword: z.string(),
			}),
		})
		.refine(
			(data) => {
				if (type === "sign-up") {
					return data.password === data.confirmPassword;
				}
				return true;
			},
			{
				message: "Passwords don't match",
				path: ["confirmPassword"],
			}
		);
};

const AuthForm = ({ type }: { type: FormType }) => {
	const router = useRouter();
	const formSchema = authFormSchema(type);
	// Define the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			...(type === "sign-up" && { confirmPassword: "" }),
		},
	});

	// Submit handler
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			if (type === "sign-up") {
				const { name, email, password } = data;
				const formData = new FormData();
				formData.append("email", email);
				formData.append("password", password);
				if (name) formData.append("name", name);
				const result = await signUp(formData);
				if (!result.success) {
					toast.error(result.message);
					redirect("/error");
				}

				toast.success(
					"Account created successfully. Please check your email to verify your account."
				);
				router.push("/email-verification");
			} else {
				const { email, password } = data;
				const formData = new FormData();
				formData.append("email", email);
				formData.append("password", password);
				const result = await signIn(formData);
				if (!result.success) {
					toast.error(result.message);
					redirect("/error");
				}
				toast.success("Signed in successfully!");
				router.push("/");
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
		<div className="card-border lg:min-w-[566px] lg:max-w-[566px] lg:mx-auto">
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
						{!isSignIn && (
							<FormField
								control={form.control}
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								placeholder="Confirm your password"
							/>
						)}
						<div className="flex justify-between items-center">
							{isSignIn && (
								<Link
									href="/forgot-password"
									className="text-sm text-muted-foreground hover:text-primary"
								>
									Forgot your password?
								</Link>
							)}
						</div>
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
