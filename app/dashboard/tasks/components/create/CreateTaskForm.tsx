"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createTask, readMemberNameID } from "../../actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState, useTransition } from "react";

const FormSchema = z.object({
  title: z.string().min(6, {
    message: "Title must be at least 6 characters.",
  }),
  completed: z.boolean(),
  created_by: z.string(),
  assigned_to: z.string(),
});

export default function CreateTaskForm({ isAdmin, isManager, user_id, isEdit }: { isAdmin: boolean; isManager: boolean; user_id:string; isEdit: boolean }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      completed: false,
      created_by: user_id,
      assigned_to: "",
    },
  });
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await readMemberNameID();
      if (fetchedUsers) {
        setUsers(fetchedUsers);
      }
    }
    fetchUsers();
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!isEdit) {
      startTransition(async () => {
        const result = await createTask(data);
        const { error } = JSON.parse(result);
        if (error?.message) {
          toast({
            title: "Failed to Create Task",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{error.message}</code>
              </pre>
            ),
          });
        } else {
          document.getElementById("create-trigger")?.click();
          toast({
            title: "Successfully Created Task",
          });
        }
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="task title"
                    type="text"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Complete</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="created_by"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Creator ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your ID"
                    type="text"
                    {...field}
                    disabled
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="assigned_to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {users.map((user) => (
                    <SelectItem value={user.id} key={user.id}>
                      {user.name}
                    </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" variant="outline">
          Submit
        </Button>
      </form>
    </Form>
  );
}
