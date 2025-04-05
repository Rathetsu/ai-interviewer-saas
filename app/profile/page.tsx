"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function ProfilePage() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const getUser = async () => {
			const supabase = createClient();
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (error || !user) {
				redirect("/sign-in");
			}

			setUser(user);
		};

		getUser();
	}, []);

	if (!user) {
		return null;
	}

	return (
		<div className="card-border lg:min-w-[566px] lg:max-w-[566px] lg:mx-auto">
			<div className="flex flex-col gap-6 card py-14 px-10">
				<h2 className="text-2xl font-bold">Profile</h2>
				<div className="space-y-4">
					<div>
						<label className="text-sm text-muted-foreground">Name</label>
						<p className="text-lg">{user.user_metadata.name}</p>
					</div>
					<div>
						<label className="text-sm text-muted-foreground">Email</label>
						<p className="text-lg">{user.email}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
