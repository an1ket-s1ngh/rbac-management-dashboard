import React from "react";
import DailogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ITask } from "@/lib/types";
import EditTaskForm from "./EditTaskForm";
import { ElevatedEditTaskForm } from "./ElevatedEditTaskForm";

export default function EditTask({
  isAdmin,
  isManager,
  task,
}:{
  isAdmin: boolean;
  isManager: boolean;
  task: ITask;
}) {
  return (
    <DailogForm
      id="update-trigger"
      title="Edit Task"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
            }
            form={isAdmin || isManager ? <ElevatedEditTaskForm isAdmin={isAdmin} isManager={isManager} isEdit={true} task_id={task?.id} /> : <EditTaskForm isAdmin={isAdmin} isManager={isManager} isEdit={true} task_id={task?.id} />}
    />
  );
}
