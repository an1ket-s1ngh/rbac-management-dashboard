"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteMemberById } from "../actions";
import { toast } from "@/components/ui/use-toast";

export default function DeleteMember({ user_id }: { user_id: string }) {
  const [isPending, startTransition] = useTransition();
  const onsubmit = async () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteMemberById(user_id));
      if (result?.error?.message) {
        toast({
          title: "Failed to Delete the Member!",
        });
      } else {
        toast({
          title: "Member Deleted Successfully!",
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
