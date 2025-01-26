import React from "react";
import MemberTable from "./components/MemberTable";
import CreateMember from "./components/create/CreateMember";
import { useUserStore } from "@/lib/store/user";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function Members() {
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
