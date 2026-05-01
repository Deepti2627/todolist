"use client";

import { useState, useRef, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import gsap from "gsap";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
};

export default function TodoApp() {
  const containerRef = useRef<HTMLDivElement>(null);
const logoRef = useRef<HTMLDivElement>(null);
const [isLoaded, setIsLoaded] = useState(false);
const [isMounted, setIsMounted] = useState(false);
const [tasks, setTasks] = useState<Task[]>(() => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
  return [];
});
// ✅ Load AFTER mount
useEffect(() => {
  try {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  } catch {}
  setIsMounted(true);
}, []);

// ✅ Save when tasks change
useEffect(() => {
  if (isMounted) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}, [tasks, isMounted]);
useEffect(() => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    setTasks(JSON.parse(saved));
  }
  setIsLoaded(true);
}, []);
useEffect(() => {
  if (isLoaded) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}, [tasks, isLoaded]);
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // 🎬 Page animation
  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      }
    );
  }, []);

  const addTask = (text: string) => {
    if (!text.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
        priority: "Medium"
      }
    ]);

    // 💥 bounce effect
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 1 },
        {
          scale: 1.03,
          duration: 0.2,
          yoyo: true,
          repeat: 1
        }
      );
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
  if (!logoRef.current) return;

  gsap.fromTo(
    logoRef.current,
    { scale: 0, rotate: -180 },
    {
      scale: 1,
      rotate: 0,
      duration: 0.6,
      ease: "back.out(2)"
    }
  );

  // subtle floating loop
  gsap.to(logoRef.current, {
    y: -4,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}, []);

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
if (!isMounted) return null;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f7] p-6">

      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2">
<div
  ref={logoRef}
  className="w-8 h-8 rounded-md"
  style={{ backgroundColor: "#0d9488" }}
/>        <h1 className="text-xl font-semibold">TaskFlow</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Stay organized, stay productive
        </p>
      </div>

      {/* CARD */}
      <div
        ref={containerRef}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6"
      >
        {/* INPUT */}
        <TodoInput addTask={addTask} />

        {/* TABS */}
        <div className="flex bg-gray-100 rounded-xl p-1 text-sm mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 rounded-lg ${
              filter === "all"
                ? "bg-white font-medium"
                : "text-gray-500"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`flex-1 py-2 rounded-lg ${
              filter === "active"
                ? "bg-white font-medium"
                : "text-gray-500"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`flex-1 py-2 rounded-lg ${
              filter === "completed"
                ? "bg-white font-medium"
                : "text-gray-500"
            }`}
          >
            Completed
          </button>
        </div>

        {/* LIST */}
        <TodoList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500 border-t pt-4">
          <span>
            {tasks.filter((t) => !t.completed).length} tasks left
          </span>
          <button onClick={clearCompleted} className="hover:text-black">
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}