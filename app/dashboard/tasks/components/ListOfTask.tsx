import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditTask from "./EditTask";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { readTasks } from "../actions";
import { useUserStore } from "@/lib/store/user";
import { IPermission } from "@/lib/types";

export default async function ListOfTask() {
  const tasks = [
    {
      title: "Finish this app",
      status: "in progress",
      created_at: new Date().toDateString(),
      create_by: "Aniket",
    },
  ];

  const { data: permissions } = await readTasks();
  const user = useUserStore.getState().user;
  const isAdmin = user?.user_metadata.role === "admin";
  const isManager = user?.user_metadata.role === "manager";
  
  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {tasks.map((task, index) => {
        return (
          <div
            className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal "
            key={index}
          >
            {Object.keys(task).map((key, index) => {
              if (key === "status") {
                return (
                  <div key={index} className="flex items-center">
                    <div>
                      <span
                        className={cn(
                          "  dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                          {
                            "border-green-500 bg-green-400 dark:text-green-400":
                              task.status === "completed",
                          }
                        )}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <h1
                    className="flex items-center dark:text-white text-lg"
                    key={index}
                  >
                    {task[key as keyof typeof task]}
                  </h1>
                );
              }
            })}

            <div className="flex gap-2 items-center">
              <Button variant="outline" className="bg-dark dark:bg-inherit">
                <TrashIcon />
                Delete
              </Button>
              <EditTask />
            </div>
          </div>
        );
      })}
    </div>
  );
}
