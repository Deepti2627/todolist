"use client";

import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

export default function TodoList({
  tasks,
  toggleTask,
  deleteTask
}: any) {
  return (
    <motion.div
      layout
      className="space-y-4 mt-4"
    >
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-10 border border-[var(--border)] rounded-xl bg-[var(--card)]"
          >
            <p className="text-[var(--muted-foreground)] text-sm">
              🌱 No tasks yet
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Start by adding something productive
            </p>
          </motion.div>
        ) : (
          tasks.map((task: any, index: number) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: index * 0.05, // stagger effect
                  type: "spring",
                  stiffness: 120
                }
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.9,
                transition: { duration: 0.2 }
              }}
            >
              <TodoItem
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
}