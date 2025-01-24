import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "./DialogForm";
import CreateForm from "./CreateForm";

export default function CreateMember() {
	return (
		<DailogForm
			id="create-trigger"
			title="Create Member"
			Trigger={<Button variant="outline" className="w-full flex items-center gap-2">Sign Up</Button>}
			form={<CreateForm />}
		/>
	);
}
