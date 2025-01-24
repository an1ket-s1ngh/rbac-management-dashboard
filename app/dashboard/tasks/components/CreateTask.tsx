import { Button } from "@/components/ui/button";
import React from "react";
import DailogForm from "./DialogForm";
import TaskForm from "./TaskForm";
import { IPermission } from "@/lib/types";

export default function CreateTask() {
  return (
    <DailogForm
      id="create-trigger"
      title="Create Task"
      Trigger={<Button variant="outline">Create</Button>}
      form={<TaskForm isEdit={false} />}
    />
  );
}
