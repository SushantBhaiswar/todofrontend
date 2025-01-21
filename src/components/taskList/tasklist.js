import { motion, AnimatePresence } from "framer-motion"
import Modal from "../modal/CustomModal";
import { useEffect, useState } from "react";
import { taskApprove, taskList, taskUDelete } from "@/apis";
import { Delete } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function TaskList({ tasks, setTasks, filter, isDataAdded, setIsDataAdded }) {
  const [open, setOpen] = useState({ show: false, des: "" })
  const [apiData, setApiData] = useState([])
  const [dataLoading, setDataLoading] = useState(true)


  const search = (localStorage.getItem('search'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taskList({ limit: 10, ...(filter && filter !== 'all' && { filter: filter }) });
        if (response?.code === 200) {
          localStorage.setItem('count', JSON.stringify(response?.data?.totalCount))
          setApiData(response?.data?.results || []);
          setIsDataAdded(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [dataLoading, isDataAdded, filter, search]);

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {apiData.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between h-[200px]"
          >
            <div className="flex-1">
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-gray-400 line-clamp-3">
                {task.description}
              </p>
              {task.description.length > 100 && (
                <button
                  className="text-purple-500 mt-2"
                  onClick={() => {
                    setOpen({ show: true, des: task.description })
                    // alert(`Full Description: ${task.description}`)
                  }}
                >
                  Read More
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span
                className={`px-2 py-1 rounded-full text-sm ${task.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                  }`}
              >
                {task.status}
              </span>
              {task.status !== "completed" && <button onClick={async () => {
                await taskApprove(task?._id)
                setDataLoading(true)
              }}>
                {task.status === "completed" ? "↩️" : "✓"}
              </button>}
              <button onClick={async () => {
                await taskUDelete(task?._id)
                setDataLoading(true)
              }}><Box width={20}><Delete /></Box></button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Modal isOpen={open} setIsOpen={setOpen} />
    </div>
  );
}
