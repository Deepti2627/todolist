"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function TodoInput({ addTask }: any) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 🌟 ENTRY ANIMATION (whole row)
  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.fromTo(
      wrapperRef.current,
      { y: 30, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out"
      }
    );
  }, []);

  // 🧲 Magnetic Button
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const move = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const leave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4 });
    };

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  const handleAdd = () => {
    if (!text.trim()) return;

    addTask(text, priority);

    const btn = buttonRef.current;
    const input = inputRef.current;

    const tl = gsap.timeline();

    // 🔥 Button bounce
    tl.to(btn, { scale: 0.9, duration: 0.1 })
      .to(btn, {
        scale: 1.2,
        duration: 0.25,
        ease: "back.out(2.5)"
      })

      // 🌿 glow
      .fromTo(
        btn,
        { boxShadow: "0 0 0px rgba(34,197,94,0.6)" },
        {
          boxShadow: "0 0 30px rgba(34,197,94,0)",
          duration: 0.5
        },
        "-=0.2"
      )

      // 💨 input exit
      .to(input, {
        x: -20,
        opacity: 0,
        duration: 0.2
      })

      // reset
      .add(() => {
        setText("");
        gsap.set(input, { x: 20 });
      })

      // bring back
      .to(input, {
        x: 0,
        opacity: 1,
        duration: 0.3
      });
  };

  return (
    <motion.div
      ref={wrapperRef}
      className="mb-6"
    >
      <div className="flex gap-3 items-center">

        {/* ✨ INPUT (animated focus) */}
        <motion.input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a task..."
          whileFocus={{
            scale: 1.02,
            boxShadow: "0px 0px 0px 3px rgba(34,197,94,0.2)"
          }}
          className="flex-1 p-4 rounded-xl
          bg-[var(--card)] border border-[var(--border)]
          text-[var(--foreground)]
          placeholder:text-[var(--muted-foreground)]
          outline-none transition"
        />

        {/* 🌿 SELECT (micro animation) */}
        <motion.select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl px-4 py-3
          bg-[var(--card)] border border-[var(--border)]
          text-[var(--foreground)]
          cursor-pointer outline-none"
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🌿 Low</option>
        </motion.select>

        {/* 🚀 BUTTON (premium motion) */}
        <motion.button
          ref={buttonRef}
          onClick={handleAdd}
          whileHover={{
            scale: 1.08,
            boxShadow: "0px 12px 30px rgba(34,197,94,0.35)"
          }}
          whileTap={{ scale: 0.92 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18
          }}
          className="px-6 py-3 rounded-xl font-medium text-white bg-[var(--primary)]"
        >
          Add
        </motion.button>

      </div>
    </motion.div>
  );
}