"use client";

import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function TodoList({
  tasks,
  toggleTask,
  deleteTask
}: any) {
  const listRef = useRef<HTMLDivElement>(null);

  // 🌟 subtle GSAP container float animation
  useEffect(() => {
    if (!listRef.current) return;

    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }
    );
  }, [tasks]);

  // 🎲 random animation generator (KEY PART)
  const getVariant = (index: number) => {
    const variants = [
      { x: -40, rotate: -5 },
      { x: 40, rotate: 5 },
      { y: 40, scale: 0.9 },
      { y: -40, scale: 1.05 },
      { x: -20, y: 20, rotate: 3 },
      { x: 20, y: -20, rotate: -3 }
    ];

    return variants[index % variants.length];
  };

  return (
    <motion.div ref={listRef} className="space-y-4 mt-4">

      <AnimatePresence mode="popLayout">

        {/* EMPTY STATE */}
        {tasks.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="text-center py-10 border border-[var(--border)]
            rounded-xl bg-[var(--card)]"
          >
            <motion.p
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="text-[var(--muted-foreground)] text-sm"
            >
              🌱 No tasks yet
            </motion.p>

            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Start by adding something productive
            </p>
          </motion.div>
        ) : (
          tasks.map((task: any, index: number) => {

            const variant = getVariant(index);

            return (
              <motion.div
                key={task.id}
                layout
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  ...variant
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 140,
                    damping: 14,
                    delay: index * 0.05
                  }
                }}
                exit={{
                  opacity: 0,
                  x: index % 2 === 0 ? 100 : -100,
                  scale: 0.8,
                  rotate: index % 2 === 0 ? 10 : -10,
                  transition: { duration: 0.25 }
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: index % 2 === 0 ? 1 : -1,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <TodoItem
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              </motion.div>
            );
          })
        )}

      </AnimatePresence>

    </motion.div>
  );
}