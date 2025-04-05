import { ErrorActions } from "@/components/ErrorActions";

export default function ErrorPage() {
	return (
		<div className="flex-center flex-col min-h-screen w-full p-8 pattern">
			<div className="card-border w-full max-w-2xl">
				<div className="card p-8 flex flex-col items-center gap-6">
					<div className="blue-gradient rounded-full size-32 flex-center relative">
						<div className="absolute inline-flex size-5/6 animate-ping rounded-full bg-primary-200 opacity-75"></div>
						<span className="text-4xl font-bold text-dark-100">404</span>
					</div>

					<h1 className="text-3xl font-bold text-primary-100 text-center">
						Oops! Something went wrong
					</h1>

					<p className="text-light-100 text-center max-w-md">
						We encountered an unexpected error. Don't worry, our team has been
						notified and is working to fix it.
					</p>

					<ErrorActions />

					<div className="mt-8 text-light-400 text-sm">
						<p>
							If the problem persists, please email me at ah.ezzat.muh@gmail.com
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
