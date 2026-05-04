"use client";

import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import useMounted from "./useMounted";
import { CheckSquare, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const mounted = useMounted();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  // Show toast utility
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const stored = localStorage.getItem("taskflow-todos");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("taskflow-todos", JSON.stringify(tasks));
  }, [tasks]);

  if (!mounted) return null;

  const addTask = (text: string) => {
    const newTask = { id: crypto.randomUUID(), text, completed: false };
    setTasks([newTask, ...tasks]);
    showToast("Task added!");
  };

  const toggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    if (task && !task.completed) {
      showToast("Task completed!");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    showToast("1 task deleted!");
  };

  const clearCompleted = () => {
    const count = tasks.filter(t => t.completed).length;
    setTasks(tasks.filter(t => !t.completed));
    if (count > 0) showToast(`${count} tasks cleared!`);
  };

  const filtered = tasks.filter(t => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex justify-center px-4 py-12 font-sans relative overflow-hidden">
      {/* WIDER CONTAINER: max-w-lg matches your request for a wider look */}
      <div className="w-full max-w-lg"> 
        
        {/* HEADER */}
    <div className="text-center mb-10">
  <div className="flex justify-center items-center gap-3 mb-3">
    {/* Logo Floating Animation - Shadow removed for a flat, clean look */}
    <motion.div 
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="bg-[#14b8a6] text-white p-2 rounded-xl" 
    >
      <CheckSquare size={32} strokeWidth={2.5} />
    </motion.div>
    <h1 className="text-2xl font-bold tracking-tight text-gray-800">TaskFlow</h1>
  </div>
  <p className="text-gray-500 font-medium text-base">Stay organized, stay productive</p>
</div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-[32px] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-50">
          <TodoInput addTask={addTask} />

          {/* FILTERS */}
          <div className="flex bg-gray-100/80 p-1.5 rounded-2xl mb-8">
            {["All", "Active", "Completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 text-sm font-bold py-3 rounded-xl transition-all duration-300 ${
                  filter === f 
                    ? "bg-white shadow-md text-gray-800 scale-[1.02]" 
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <TodoList 
            tasks={filtered} 
            filter={filter} 
            toggleTask={toggleTask} 
            deleteTask={deleteTask} 
          />

          {/* FOOTER */}
          <div className="flex justify-between items-center text-sm mt-8 pt-6 border-t border-gray-100">
            <div className="text-gray-400 font-medium">
              <span className="text-gray-900 font-bold">{tasks.filter(t => !t.completed).length}</span> tasks left
            </div>
            <button 
              onClick={clearCompleted}
              className="text-gray-400 hover:text-red-500 font-bold transition-colors"
            >
              Clear completed
            </button>
          </div>
        </div>
      </div>

      {/* TOAST NOTIFICATION: As seen in Screenrecording_20260504_110839.mp4 */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: -40, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 min-w-[200px]"
          >
            <div className="bg-teal-500 rounded-full p-0.5">
              <CheckCircle2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}