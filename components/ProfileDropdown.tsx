"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ProfileDropdown() {
	const router = useRouter();
	const [showSignOutDialog, setShowSignOutDialog] = useState(false);

	const handleSignOut = async () => {
		const supabase = createClient();
		const { error } = await supabase.auth.signOut();
		if (!error) {
			router.push("/sign-in");
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="rounded-full">
						<User className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => router.push("/profile")}>
						Profile
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => setShowSignOutDialog(true)}
						className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950"
					>
						<LogOut className="h-4 w-4 mr-2" />
						Sign Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to sign out?
						</AlertDialogTitle>
						<AlertDialogDescription>
							You will need to sign in again to access your account.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleSignOut}
							className="bg-red-500 hover:bg-red-600 text-white"
						>
							Sign Out
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
