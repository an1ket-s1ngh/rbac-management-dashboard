import React from "react";
import ListOfMembers from "./ListOfMembers";
import Table from "@/components/ui/Table";

export default function MemberTable() {
	const tableHeader = ["Name", "Role", "Joined", "Status","Action"];

	return (
		<Table cols={5} headers={tableHeader}>
			<ListOfMembers />
		</Table>
	);
}
