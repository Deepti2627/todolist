"use client";

import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import useMounted from "./useMounted";
import { CheckSquare } from "lucide-react";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoApp() {
  const mounted = useMounted();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("taskflow-todos");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("taskflow-todos", JSON.stringify(tasks));
  }, [tasks]);

  if (!mounted) return null;

  const addTask = (text: string) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filtered = tasks.filter(t => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-[#faf9f7] flex justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
     <div className="flex justify-center items-center gap-2 mb-2">
  <div className="bg-teal-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
    <CheckSquare size={20} />
  </div>
  <h1 className="text-xl font-extrabold tracking-tight">
    TaskFlow
  </h1>
</div>
          <p className="text-sm text-gray-400">
            Stay organized, stay productive
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white border rounded-xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">

          <TodoInput addTask={addTask} />

          {/* FILTERS */}
          <div className="relative flex bg-gray-100 rounded-lg p-1 mb-4">
            {["All", "Active", "Completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 text-xs font-semibold py-2 rounded-md transition ${
                  filter === f
                    ? "bg-white shadow text-gray-800"
                    : "text-gray-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* LIST */}
          <TodoList
            tasks={filtered}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />

          {/* FOOTER */}
          <div className="flex justify-between items-center text-xs text-gray-400 mt-4 pt-4 border-t">
            <span>
              <span className="font-bold text-gray-700">{activeCount}</span> tasks left
            </span>
            <button
              onClick={clearCompleted}
              className="hover:text-red-500"
            >
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}