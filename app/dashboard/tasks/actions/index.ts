"use server";
import {
  createSupabaseAdmin,
  createSupabaseServerClient,
} from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function readMemberNameID() {
  unstable_noStore();
  const supabase = await createSupabaseAdmin();
  return (await supabase.from("member").select("id,name")).data;
}

export async function readMemberNameByID(member_id: string) {
  unstable_noStore();
  const supabase = await createSupabaseAdmin();
  return (await supabase.from("member").select("name").eq("id", member_id)).data;
}

export async function createTask(data: { title: string; completed: boolean; created_by: string; assigned_to: string }) {
  const supabase = await createSupabaseAdmin();
  const taskResult = await supabase.from("task").insert({
    title: data.title,
    completed: data.completed,
    created_by: data.created_by,
    assigned_to: data.assigned_to.split(" - ")[0],
  });
  if (taskResult.error?.message) return JSON.stringify(taskResult);
  else {
    revalidatePath("/dashboard/tasks");
    return JSON.stringify(taskResult);
  }
}


export async function updateTaskById(data: { title: string; completed: boolean; task_id: string }) {
  const payload = {
    title: data.title,
    completed: data.completed,
  };
  const supabase = await createSupabaseAdmin();
  const taskResult = await supabase.from("task").update(payload).eq("id", data.task_id);
  if (taskResult.error?.message) return JSON.stringify(taskResult);
  else {
    revalidatePath("/dashboard/tasks");
    return JSON.stringify(taskResult);
  }
}

export async function updateTaskByIdElevated(data: { title: string; completed: boolean; assigned_to: string; task_id: string }) {
  const payload = {
    title: data.title,
    completed: data.completed,
    assigned_to: data.assigned_to.split(" - ")[0],
  };
  const supabase = await createSupabaseAdmin();
  const taskResult = await supabase.from("task").update(payload).eq("id", data.task_id);
  if (taskResult.error?.message) return JSON.stringify(taskResult);
  else {
    revalidatePath("/dashboard/tasks");
    return JSON.stringify(taskResult);
  }
}

export async function deleteTaskById(task_id: string) {
  const supabaseAdmin = await createSupabaseAdmin();
  const searchTaskResult = await supabaseAdmin.from("task").select().eq("id", task_id);
  if (searchTaskResult.error?.message) return JSON.stringify(searchTaskResult);
  else {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("task").delete().eq("id", task_id);
    revalidatePath("/dashboard/tasks");
    return JSON.stringify(result);
  }
}

export async function readTasks() {
  unstable_noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("task").select("*");
}