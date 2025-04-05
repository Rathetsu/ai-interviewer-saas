import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import ProfileDropdown from "@/components/ProfileDropdown";

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="root-layout">
			<nav className="flex justify-between items-center">
				<Link href="/" className="flex item-center gap-2">
					<Image src="/logo.svg" alt="interviewly" width={230} height={96} />
				</Link>
				<ProfileDropdown />
			</nav>
			{children}
		</div>
	);
};

export default RootLayout;
