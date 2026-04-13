"use client";

import { Suspense } from "react";

import AddTask from "@/Components/Addtask";

export default function AddTaskPage() {
  return (<Suspense fallback={<div>Loading...</div>}>
    <AddTask />
  </Suspense>);
}