import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "../DialogForm";
import CreateTaskForm from "./CreateTaskForm";


export default function CreateTask({
  isAdmin,
  isManager,
  user_id,
}:{
  isAdmin: boolean;
  isManager: boolean;
  user_id: string;
}) {
  return (
    <DailogForm
      id="create-trigger"
      title="Create Task"
      Trigger={<Button variant="outline" className="text-xl py-2 px-3">Create Task</Button>}
      form={<CreateTaskForm isAdmin={isAdmin} isManager={isManager} user_id={user_id} isEdit={false} />}
    />
  );
}
