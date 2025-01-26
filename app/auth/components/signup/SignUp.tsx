import { Button } from "@/components/ui/button";
import React from "react";
import SignUpForm from "./SignUpForm";
import DailogForm from "@/app/dashboard/members/components/DialogForm";

export default function SignUP() {
	return (
		<DailogForm
			id="create-trigger"
			title="Sign Up"
			Trigger={<Button variant="outline" className="w-full flex items-center gap-2">Sign Up</Button>}
			form={<SignUpForm />}
		/>
	);
}
