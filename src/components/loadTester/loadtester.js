// src/components/loadTester/loadtester.js
"use client";
import { useState } from "react";

export default function LoadTester() {
  const [count, setCount] = useState(1000); // Default to 1000 tasks
  const [loading, setLoading] = useState(false);

  const createManyTasks = async () => {
    setLoading(true);
    const promises = Array(count)
      .fill(null)
      .map(() =>
        fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: `Test Task ${Math.random()}`,
            description: "Generated for load testing",
            dueDate: new Date().toISOString(),
          }),
        })
      );

    try {
      await Promise.all(promises);
      alert(`Successfully created ${count} tasks!`);
    } catch (error) {
      alert("Error creating tasks");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
        className="w-24 bg-gray-800 p-2 rounded-lg"
      />
      <button
        onClick={createManyTasks}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Creating..." : `Create ${count} Tasks`}
      </button>
    </div>
  );
}
