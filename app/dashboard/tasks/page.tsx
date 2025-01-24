import React from "react";
import TaskTable from "./components/TaskTable";
import SearchTask from "./components/SearchTask";
import CreateTask from "./components/CreateTask";
import { useUserStore } from "@/lib/store/user";

export default function Task() {
	const user = useUserStore.getState().user;
	const isAdmin = user?.user_metadata.role === "admin";
	const isManager = user?.user_metadata.role === "manager";
	return (
		<div className="space-y-5 w-full overflow-y-auto px-3">
			<h1 className="text-3xl font-bold">Tasks</h1>
			{(isAdmin || isManager) && (<div className="flex gap-2">
				<SearchTask />
				<CreateTask />
			</div>
			)}
			<TaskTable />
		</div>
	);
}
