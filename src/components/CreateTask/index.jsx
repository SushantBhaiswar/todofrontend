import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { taskCreate } from "@/apis";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, setIsDataAdded }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.length || !description.length || !dueDate.length) return;

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("🚀 ~ handleSubmit ~ savedTasks:", savedTasks);

    // Add the new task to the saved tasks array
    savedTasks.push({ title, description, dueDate, status });

    // Save the updated tasks back to localStorage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    const payload = { title, description, dueDate };
    const response = await taskCreate(payload);
    if (response.code === 200) {
      handleClose();
      setTitle("");
      setDescription("");
      setDueDate("");
      setError(false);
      setIsDataAdded(true);
    }
    // const response = await fetch("/api/tasks", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ title, description, dueDate, status }),
    // });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description" className="my-dialog">
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}

        <>
          <div className="p-6 min-w-[500px] max-w-xl mx-auto bg-gray-800 rounded-lg h-fit">
            <h2 className="text-2xl text-center text-purple-500">Create New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300">Title</label>
                <input type="text" value={title} onFocus={() => setError(true)} required onChange={(e) => setTitle(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />

                {!title.length && error ? <span className="error-text">Title is required.</span> : ""}
              </div>
              <div>
                <label className="block text-gray-300">Description</label>
                <textarea required onFocus={() => setError(true)} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white"></textarea>
                {!description.length && error ? <span className="error-text">Description is required.</span> : ""}
              </div>
              <div>
                <label className="block text-gray-300">Due Date</label>
                <input type="date" required onFocus={() => setError(true)} value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 rounded bg-gray-700 text-white" />
                {!dueDate.length && error ? <span className="error-text">Due Date is required.</span> : ""}
              </div>
              <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded-lg">
                Create Task
              </button>
            </form>
          </div>
        </>
      </Dialog>
    </React.Fragment>
  );
}
