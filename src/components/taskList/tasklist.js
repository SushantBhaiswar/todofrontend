import { motion, AnimatePresence } from "framer-motion"

export default function TaskList({ tasks, setTasks, filter }) {
    const filteredTasks = tasks.filter((task) => {
      if (filter === "today") {
        return new Date(task.dueDate).toDateString() === new Date().toDateString();
      }
      if (filter === "completed") return task.status === "completed";
      if (filter === "pending") return task.status === "pending";
      return true;
    });
  
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between"
            >
              <div className="flex-1">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-gray-400 line-clamp-3">
                  {task.description}
                </p>
                {task.description.length > 100 && (
                  <button
                    className="text-purple-500 mt-2"
                    onClick={() => alert(`Full Description: ${task.description}`)}
                  >
                    Read More
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    task.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {task.status}
                </span>
                <button onClick={() => {/* Toggle completion */}}>
                  {task.status === "completed" ? "↩️" : "✓"}
                </button>
                <button onClick={() => {/* Delete task */}}>🗑️</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
  