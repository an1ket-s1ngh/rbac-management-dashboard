import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "../DialogForm";
import CreateForm from "./CreateForm";

export default function CreateMember() {
	return (
		<DailogForm
			id="create-trigger"
			title="Create Member"
			Trigger={<Button variant="outline" className="text-xl py-2 px-3">Create Member</Button>}
			form={<CreateForm />}
		/>
	);
}
