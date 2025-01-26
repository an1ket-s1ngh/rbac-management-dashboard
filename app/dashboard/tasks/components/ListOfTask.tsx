import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditTask from "./edit/EditTask";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { readMemberNameByID, readTasks } from "../actions";
import { useUserStore } from "@/lib/store/user";
import { IPermission, ITask } from "@/lib/types";
import DeleteTask from "./DeleteTask";

export default async function ListOfTask() {
  const { data : tasks } = await readTasks();
  const user = useUserStore.getState().user;
  const isAdmin = user?.user_metadata.role === "admin";
  const isManager = user?.user_metadata.role === "manager";

  return (
    <div className="dark:bg-inherit bg-white rounded-sm">
      {(tasks as ITask[])?.map(async (task, index) => {
        return (
          <div
            className="mx-2 grid grid-cols-6  rounded-sm  p-3 align-middle font-normal "
            key={index}
          >
            <h1>{task.title}</h1>
            <div>
              <span
              className={cn(
                "  dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                {
                  "border-green-500 bg-green-400 dark:text-green-400":
                    task.completed === true,
                }
              )}
            >
              {task.completed ? "Completed" : "In Progress"}
            </span>
            </div>

            <h1>{new Date(task.created_at).toDateString()}</h1>

            <h1>{(await readMemberNameByID(task.created_by))?.map(member => member.name).join(", ")}</h1>
              
            <h1>{(await readMemberNameByID(task.assigned_to))?.map(member => member.name).join(", ")}</h1>

            <div className="flex items-center gap-5 justify-stretch">
              {(isAdmin || isManager) && <DeleteTask task_id={task.id} />}
              <EditTask isManager={isManager} isAdmin={isAdmin} task={task}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}
