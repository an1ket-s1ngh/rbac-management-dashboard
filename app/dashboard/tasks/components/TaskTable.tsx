import React from "react";
import ListOfTask from "./ListOfTask";
import Table from "@/components/ui/Table";

export default function TaskTable() {
	const tableHeader = ["Title", "Status", "Created at", "Created by"];

	return (
		<Table headers={tableHeader}>
			<ListOfTask />
		</Table>
	);
}
