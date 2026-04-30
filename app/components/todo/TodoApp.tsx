"use client";

import { useState, useRef, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { motion } from "framer-motion";
import gsap from "gsap";
import SuccessPopup from "./SuccessPopup";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: string;
};

export default function TodoApp() {
  const [showPopup, setShowPopup] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Design homepage", completed: false, priority: "High" },
    { id: 2, text: "Drink water", completed: true, priority: "Low" }
  ]);

  // 🎬 GSAP intro + floating
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
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

  const addTask = (text: string, priority: string) => {
    if (!text.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
        priority
      }
    ]);

    setShowPopup(true);

    // 💥 bump animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 1 },
        {
          scale: 1.03,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        }
      );
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)]">

      <SuccessPopup show={showPopup} />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{
          rotateX: 2,
          rotateY: -2,
          transition: { duration: 0.3 }
        }}
        className="w-full max-w-xl bg-[var(--card)] border border-[var(--border)]
        rounded-3xl shadow-md p-6 relative overflow-hidden"
      >

        {/* 🌿 Glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              opacity: [0.08, 0.15, 0.08],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full bg-[var(--primary)] blur-3xl opacity-10"
          />
        </div>

        {/* 🧠 Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.06 }
            }
          }}
          className="text-center mb-6 relative z-10"
        >

<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  }}
  className="text-center mb-6"
>

  {/* 📝 Title */}
  <motion.h1 className="text-3xl font-semibold text-[var(--foreground)]">
    {Array.from("📝 Todo List").map((char, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { y: -25, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 180,
              damping: 14
            }
          }
        }}
        whileHover={{
          y: -6,
          color: "var(--primary)"
        }}
        className="inline-block will-change-transform"
        style={{
          marginRight: char === " " ? "0.35rem" : "0"
        }}
      >
        {char}
      </motion.span>
    ))}
  </motion.h1>

  {/* ✨ Subtitle */}
  <motion.p
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }
    }}
    className="text-[var(--muted-foreground)] mt-1 text-sm"
  >
    Stay organized in a clean way
  </motion.p>

</motion.div>

          {/* 🌿 Underline */}
          <motion.div
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: {
                width: "60px",
                opacity: 1,
                transition: { delay: 0.3, duration: 0.4 }
              }
            }}
            className="h-[3px] bg-[var(--primary)] mx-auto mt-3 rounded-full"
          />
        </motion.div>

        {/* 📊 Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10"
        >
          <ProgressBar tasks={tasks} />
        </motion.div>

        {/* ✍️ Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10"
        >
          <TodoInput addTask={addTask} />
        </motion.div>

        {/* 📋 List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10"
        >
          <TodoList
            tasks={tasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </motion.div>

      </motion.div>
    </div>
  );
}