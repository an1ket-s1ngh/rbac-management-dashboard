import { Input } from "@/components/ui/input";
import React from "react";

export default function SearchTask() {
  return (
    <Input
      placeholder="search by title or author"
      className=" border-zinc-600  focus:border-zinc-600"
    />
  );
}
