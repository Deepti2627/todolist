"use client";

import { motion } from "framer-motion";

export default function ProgressBar({ tasks }: any) {
  const done = tasks.filter((t: any) => t.completed).length;
  const percent = tasks.length ? (done / tasks.length) * 100 : 0;

  return (
    <div className="mb-8">

      
      <div className="flex justify-between mb-2 text-sm">
        <span className="text-[var(--muted-foreground)]">
          Progress
        </span>
        <span className="text-[var(--foreground)] font-medium">
          {done}/{tasks.length}
        </span>
      </div>

      {/* 📊 Bar */}
      <div className="bg-[var(--muted)] h-3 rounded-full overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
          className="h-full bg-[var(--primary)] relative"
        >

          {/* ✨ subtle shine effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: 0
            }}
            className="absolute inset-0 bg-white/20"
          />

        </motion.div>

      </div>

    </div>
  );
}