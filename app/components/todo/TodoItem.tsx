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
  const checkRef = useRef<any>(null);

  // 🎯 GSAP checkbox animation
  const handleCheck = () => {
    if (checkRef.current) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0.5, rotate: -20 },
        {
          scale: 1.2,
          rotate: 0,
          duration: 0.3,
          ease: "back.out(4)",
          yoyo: true,
          repeat: 1
        }
      );
    }
    toggleTask(task.id);
  };

  // 🌿 Green-based priority system (no harsh colors)
  const priorityStyles: any = {
    High: "bg-[var(--accent)] text-white",
    Medium: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
    Low: "bg-[var(--muted)] text-[var(--muted-foreground)]"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: 120,
        scale: 0.9,
        transition: { duration: 0.25 }
      }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-2xl flex justify-between items-center 
      bg-[var(--card)] border border-[var(--border)]
      shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-4">

        {/* ✅ Animated Checkbox */}
        <motion.div
          ref={checkRef}
          whileTap={{ scale: 0.85 }}
          onClick={handleCheck}
          className="w-6 h-6 flex items-center justify-center rounded-md 
          border border-[var(--border)] cursor-pointer"
          style={{
            background: task.completed ? "var(--primary)" : "transparent"
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

        <div>
          <motion.p
            layout
            initial={false}
            animate={{
              opacity: task.completed ? 0.5 : 1
            }}
            className={`font-medium ${
              task.completed
                ? "line-through"
                : "text-[var(--foreground)]"
            }`}
          >
            {task.text}
          </motion.p>

          <span
            className={`px-3 py-1 text-xs rounded-full mt-1 inline-block ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>

      </div>

      {/* 🗑 Delete with better feedback */}
      <motion.button
        whileHover={{ scale: 1.15, rotate: 8 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => deleteTask(task.id)}
        className="text-[var(--muted-foreground)] hover:text-red-500 transition"
      >
        <Trash2 size={18} />
      </motion.button>
    </motion.div>
  );
}