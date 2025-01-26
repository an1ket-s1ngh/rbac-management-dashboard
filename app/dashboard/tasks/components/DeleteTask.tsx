"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteTaskById } from "../actions";
import { toast } from "@/components/ui/use-toast";

export default function DeleteTask({ task_id }: { task_id: string }) {
  const [isPending, startTransition] = useTransition();
  const onsubmit = async () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteTaskById(task_id));
      if (result?.error?.message) {
        toast({
          title: "Failed to Delete the Task!",
          description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(result?.error?.message)}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Task Deleted Successfully!",
        });
      }
    });
  };

  return (
    <form action={onsubmit}>
      <Button variant="outline">
        <TrashIcon />
        Delete
      </Button>
    </form>
  );
}
