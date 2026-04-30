"use client";

import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";

export default function TodoItem({
  task,
  toggleTask,
  deleteTask
}: any) {
  const checkRef = useRef<HTMLDivElement | null>(null);

  // 🎯 Checkbox animation
  const handleCheck = () => {
    if (checkRef.current) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0.6, rotate: -15 },
        {
          scale: 1.15,
          rotate: 0,
          duration: 0.3,
          ease: "back.out(3)",
          yoyo: true,
          repeat: 1
        }
      );
    }

    toggleTask(task.id);
  };

  // 🌿 SAFE priority mapping (FIXED)
  const priorityStyles: Record<string, string> = {
    High: "bg-green-500 text-white",
    Medium: "bg-green-300 text-black",
    Low: "bg-gray-200 text-gray-700"
  };

  const safePriority =
    task.priority === "High" ||
    task.priority === "Medium" ||
    task.priority === "Low"
      ? task.priority
      : "Medium";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: 100,
        scale: 0.9,
        transition: { duration: 0.25 }
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 10px 25px rgba(0,0,0,0.08)"
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="p-4 rounded-2xl flex justify-between items-center 
      bg-[var(--card)] border border-[var(--border)]
      shadow-sm transition-all duration-300"
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Checkbox */}
        <motion.div
          ref={checkRef}
          whileTap={{ scale: 0.85 }}
          onClick={handleCheck}
          className="w-6 h-6 flex items-center justify-center rounded-md 
          border border-[var(--border)] cursor-pointer"
          style={{
            background: task.completed
              ? "var(--primary)"
              : "transparent"
          }}
        >
          {task.completed && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-white text-xs"
            >
              ✓
            </motion.span>
          )}
        </motion.div>

        {/* TEXT */}
        <div>
          <motion.p
            layout
            animate={{
              opacity: task.completed ? 0.5 : 1,
              textDecoration: task.completed
                ? "line-through"
                : "none"
            }}
            className="font-medium text-[var(--foreground)]"
          >
            {task.text}
          </motion.p>

          {/* PRIORITY BADGE (FIXED) */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`px-3 py-1 text-xs rounded-full mt-1 inline-block
            ${priorityStyles[safePriority]}`}
          >
            {safePriority}
          </motion.span>
        </div>
      </div>

      {/* DELETE BUTTON */}
      <motion.button
        whileHover={{
          scale: 1.2,
          rotate: 10,
          color: "#ef4444"
        }}
        whileTap={{ scale: 0.8 }}
        onClick={() => deleteTask(task.id)}
        className="text-[var(--muted-foreground)] transition"
      >
        <Trash2 size={18} />
      </motion.button>
    </motion.div>
  );
}