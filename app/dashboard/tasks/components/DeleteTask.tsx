"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteTaskById } from "../actions";
import { toast } from "@/components/ui/use-toast";

export default function DeleteTask({ user_id }: { user_id: string }) {
  const [isPending, startTransition] = useTransition();
  const onsubmit = async () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteTaskById(user_id));
      if (result?.error?.message) {
        toast({
          title: "Failed to Delete the Task!",
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
