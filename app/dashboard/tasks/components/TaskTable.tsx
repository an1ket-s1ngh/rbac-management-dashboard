import React from "react";
import ListOfTask from "./ListOfTask";
import Table from "@/components/ui/Table";

export default function TaskTable() {
	const tableHeader = ["Title", "Status", "Created At", "Created By", "Assigned To", "Action"];

	return (
		<Table cols={6} headers={tableHeader}>
			<ListOfTask />
		</Table>
	);
}
