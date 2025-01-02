"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/slider/slider";
import TaskList from "../components/taskList/tasklist";
import LoadTester from "../components/loadTester/loadtester";
import { useRouter } from "next/navigation";
import store from "@/store";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const handleAddNewTask = () => {
    router.push('/create-task')
  }
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);
  return (
    <div className="flex min-h-screen" sx={{}}>
      <Sidebar filter={filter} setFilter={setFilter} handleAddNewTask={handleAddNewTask} />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tasks ({tasks.length})</h1>
          <LoadTester />
        </div>
        <TaskList tasks={tasks} setTasks={setTasks} filter={filter} />
      </main>
    </div>
  );
}
