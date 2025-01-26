import React from "react";
import MemberTable from "./components/MemberTable";
import CreateMember from "./components/create/CreateMember";
import { useUserStore } from "@/lib/store/user";

export default function Members() {
  const user = useUserStore.getState().user;
  const isAdmin = user?.user_metadata.role === "admin";
  const isManager = user?.user_metadata.role === "manager";
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Members</h1>
      { (isAdmin || isManager) && (
        <div className="flex gap-2">
          {isAdmin && <CreateMember />}
        </div>
      )}
      <MemberTable />
    </div>
  );
}
