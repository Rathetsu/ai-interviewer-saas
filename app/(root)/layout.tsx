import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="root-layout">
			<nav>
				<Link href="/" className="flex item-center gap-2">
					<Image src="/logo.svg" alt="interviewly" width={450} height={300} />
				</Link>
			</nav>
			{children}
		</div>
	);
};

export default RootLayout;
