import React from "react";
import AuthForm from "./components/login/LoginForm";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import LoginForm from "./components/login/LoginForm";
import { createSupabaseAdmin } from "@/lib/supabase";


export default async function page() {
	const { data: userSession } = await readUserSession();

	if (userSession.session) {
		const supabase= await createSupabaseAdmin();
		const { data: userStatus } = await supabase
			.from('permission')
			.select('status')
			.eq('member_id', userSession.session.user.id)
			.single();

		if (userStatus?.status === "resigned") {
			return redirect("/inactive");
		}
		else return redirect("/dashboard");
	}
	return (
		<div className="flex items-center justify-center h-screen">
			<LoginForm />
		</div>
	);
}
