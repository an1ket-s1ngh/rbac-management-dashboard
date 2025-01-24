"use server";

import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginWithEmailAndPassword(data: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase.auth.signInWithPassword(data);
  return JSON.stringify(result);
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth");
}

export async function createMember(data: {
  name: string;
  role: "admin" | "manager" | "verified_user" | "new_user";
  status: "active" | "resigned";
  email: string;
  password: string;
  confirm: string;
}) {
  const supabase = await createSupabaseAdmin();
  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: "new_user",
    },
  });

  if (createResult.error?.message) return JSON.stringify(createResult);
  else {
    const memberResult = await supabase.from("member").insert({
      name: data.name,
      id: createResult.data.user?.id,
      email: data.email,
    });
    if (memberResult.error?.message) return JSON.stringify(memberResult);
    else {
      const permissionResult = await supabase.from("permission").insert({
        role: "new_user",
        member_id: createResult.data.user?.id,
        status: "active",
      });
      revalidatePath("/auth");
      return JSON.stringify(permissionResult);
    }
  }
}
