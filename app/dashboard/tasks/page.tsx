import React from "react";
import TaskTable from "./components/TaskTable";
import CreateTask from "./components/create/CreateTask";
import { useUserStore } from "@/lib/store/user";
import { redirect } from "next/navigation";
import { createSupabaseAdmin } from "@/lib/supabase";
import { readUserSession } from "@/lib/actions";

export default async function Task() {
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
				}}

	const user = useUserStore.getState().user;
	if(user?.user_metadata.role === "new_user"){
		return redirect("/dashboard/members");
	}
	const isAdmin = user?.user_metadata.role === "admin";
	const isManager = user?.user_metadata.role === "manager";
	return (
		<div className="space-y-5 w-full overflow-y-auto px-3" suppressHydrationWarning>
			<h1 className="text-3xl font-bold">Tasks</h1>
			{(isAdmin || isManager) && (<div className="flex gap-2">
				<CreateTask isAdmin={isAdmin} isManager={isManager} user_id={user?.id} />
			</div>
			)}
			<TaskTable />
		</div>
	);
}
