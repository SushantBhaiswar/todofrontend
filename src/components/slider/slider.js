"use client"; // Add this directive at the top of the file

export default function Sidebar({ filter, setFilter ,handleAddNewTask }) {
   
    const filters = [
        { id: "all", label: "All tasks" },
        { id: "today", label: "Today's tasks" },
        { id: "completed", label: "Completed tasks" },
        { id: "pending", label: "Pending tasks" },
    ];

    return (
        <aside className="w-64 bg-gray-900 p-6 space-y-6 md:block sm:hidden">
            <h2 className="text-xl font-bold text-purple-500">TO-DO LIST</h2>
            <button onClick={handleAddNewTask}
                className="w-full bg-purple-600 hover:bg-purple-700 transition-colors p-3 rounded-lg">
                Add new task
            </button>
            <nav className="space-y-2">
                {filters.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setFilter(item.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${filter === item.id ? "bg-purple-600" : "hover:bg-gray-800"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
