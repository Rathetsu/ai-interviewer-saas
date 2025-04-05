"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export function ErrorActions() {
	return (
		<div className="flex gap-4 mt-4">
			<Button className="btn-primary">
				<Link href="/">Return Home</Link>
			</Button>
			<button
				onClick={() => window.location.reload()}
				className="btn-secondary"
			>
				Try Again
			</button>
		</div>
	);
}
