"use client";

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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { loginWithEmailAndPassword } from "../../actions";
import { AuthTokenResponse } from "@supabase/supabase-js";
import SignUp from "../signup/SignUp";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password can not be empty" }),
});

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { error } = JSON.parse(
        await loginWithEmailAndPassword(data)
      ) as AuthTokenResponse;

      if (error) {
        toast({
          title: "Fail to login",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Successfully Logged-in 🎉",
        });
      }
    });
  }

  return (
    <div className="w-96">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
                <div className="h-4" />
                <FormDescription>
                  {"Forgot Your Password? Kindly Contact Your Administrator."}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            Login{" "}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", {
                hidden: true,
              })}
            />
          </Button>
          <FormDescription>
                  {"Not a member yet? Kindly Sign Up Below."}
          </FormDescription>
          <SignUp />
        </form>
      </Form>
    </div>
  );
}
