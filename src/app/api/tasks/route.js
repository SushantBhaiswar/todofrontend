// app/api/tasks/route.js
import { NextResponse } from "next/server";
import store from "@/store";

export async function POST(request) {
  const body = {
    id: Math.random().toString(36).substr(2, 9),
    title: "jjghhj",
    description:" body.description",
    status: "pending",
    dueDate: new Date(),
    createdAt: new Date().toISOString()
  }

  // In a real app, you would save this to a database
  

  return NextResponse.json(task);
}

// types/task.js
// Define a task as an object, no type constraints are needed
// export const Task = {
//     id: String,
//     title: String,
//     description: String,
//     status: String,
//     dueDate: String,
//     createdAt: String
//   };
