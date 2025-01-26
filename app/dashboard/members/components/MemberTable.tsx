import { Button } from "@/components/ui/button";
import React from "react";
import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";
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
