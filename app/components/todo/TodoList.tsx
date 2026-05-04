"use client";
import { ClipboardList, PartyPopper, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, filter, toggleTask, deleteTask }: any) {
  // Empty State Logic: Different icons for each filter view
  if (tasks.length === 0) {
    const config: any = {
      All: { 
        icon: <ClipboardList size={80} strokeWidth={1.5} />, 
        title: "No tasks yet", 
        desc: "Add your first task to get started" 
      },
      Active: { 
        icon: <PartyPopper size={80} strokeWidth={1.5} />, 
        title: "All done!", 
        desc: "No active tasks remaining" 
      },
      Completed: { 
        icon: <Clock size={80} strokeWidth={1.5} />, 
        title: "Nothing completed", 
        desc: "Complete some tasks to see them here" 
      }
    };

    const empty = config[filter] || config.All;

    return (
      <div className="text-center py-20">
        {/* Scaling and Floating Animation for the central icon */}
        <motion.div
          key={filter} // Re-run animation when filter changes
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: [0, -12, 0] // Floating effect loop
          }}
          transition={{ 
            scale: { duration: 0.6, ease: "circOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-gray-200 mb-6 flex justify-center"
        >
          {empty.icon}
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-700"
        >
          {empty.title}
        </motion.h3>
        <p className="text-gray-400 mt-2 text-base font-medium">{empty.desc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task: any) => (
         <motion.div
  key={task.id}
  initial={{ opacity: 0, scale: 0.8, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.8, x: -20, transition: { duration: 0.2 } }}
  layout 
  transition={{
    layout: { 
      type: "spring", 
      stiffness: 500, 
      damping: 30,
      
    }
  }}
>
  <TodoItem 
    task={task} 
    toggleTask={toggleTask} 
    deleteTask={deleteTask} 
  />
</motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}