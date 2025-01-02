// src/app/create-task/page.js
"use client";

import { useState } from "react";
import store from "@/store";
import { useRouter } from "next/navigation";
export default function CreateTask() {
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("pending");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log("🚀 ~ handleSubmit ~ savedTasks:", savedTasks)

        // Add the new task to the saved tasks array
        savedTasks.push({ title, description, dueDate, status });

        // Save the updated tasks back to localStorage
        localStorage.setItem('tasks', JSON.stringify(savedTasks));

        router.push('/')
        // const response = await fetch("/api/tasks", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ title, description, dueDate, status }),
        // });

    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-gray-800 rounded-lg">
            <h2 className="text-2xl text-center text-purple-500">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <div>
                    <label className="block text-gray-300">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-300">Due Date</label>
                    <input
                        type="datetime-local"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded-lg"
                >
                    Create Task
                </button>
            </form>
        </div>
    );
}