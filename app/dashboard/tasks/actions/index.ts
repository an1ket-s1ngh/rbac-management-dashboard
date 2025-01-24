"use server";

import { readUserSession } from "@/lib/actions";
import {
  createSupabaseAdmin,
  createSupabaseServerClient,
} from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createTask(data: { title: string; completed: boolean }) {
  const supabase = await createSupabaseAdmin();
  const taskResult = await supabase.from("task").insert({
    title: data.title,
    completed: data.completed,
  });
  if (taskResult.error?.message) return JSON.stringify(taskResult);
  else {
    revalidatePath("/dashboard/tasks");
    return JSON.stringify(taskResult);
  }
}
export async function updateTaskById(id: string) {
  console.log("update task");
}

export async function deleteTaskById(user_id: string) {
  //Should be Admin or Manager
  const { data: userSession } = await readUserSession();
  const role = userSession.session?.user.user_metadata.role
  if (role !== "admin" || role !== "manager")
    return JSON.stringify({
      error: { message: "You don't have permission to Delete a Task" },
    });

  //Delete in Supabase
  const supabaseAdmin = await createSupabaseAdmin();
  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);

  if (deleteResult.error?.message) return JSON.stringify(deleteResult);
  else {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("member").delete().eq("id", user_id);
    revalidatePath("/dashboard/member");
    return JSON.stringify(result);
  }
}

export async function readTasks() {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("task").select("*");
}
