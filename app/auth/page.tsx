import React from "react";
import AuthForm from "./components/login/LoginForm";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import LoginForm from "./components/login/LoginForm";


export default async function page() {
	const { data: userSession } = await readUserSession();

	if (userSession.session) {
		return redirect("/auth");
	}
	return (
		<div className="flex items-center justify-center h-screen">
			<LoginForm />
		</div>
	);
}
