"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function TodoInput({ addTask }: any) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 🧲 Magnetic Button
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const move = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
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
    if (!text.trim() || !buttonRef.current || !inputRef.current) return;

    addTask(text, priority);

    const btn = buttonRef.current;
    const input = inputRef.current;

    const tl = gsap.timeline();

    // 🔥 Button press
    tl.to(btn, {
      scale: 0.9,
      duration: 0.1
    })
      .to(btn, {
        scale: 1.15,
        duration: 0.25,
        ease: "back.out(2.5)"
      })

      // 🌿 Green ripple glow
      .fromTo(
        btn,
        { boxShadow: "0 0 0px rgba(34,197,94,0.6)" },
        {
          boxShadow: "0 0 25px rgba(34,197,94,0)",
          duration: 0.5
        },
        "-=0.2"
      )

      // 💨 Input slide out
      .to(
        input,
        {
          x: -30,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in"
        },
        "-=0.3"
      )

      // 🔄 Reset
      .add(() => {
        setText("");
        gsap.set(input, { x: 30 });
      })

      // ✨ Slide back
      .to(input, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
  };

  return (
    <div className="mb-6">

      <div className="flex gap-3">

        {/* 🧊 Input */}
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a task..."
          className="flex-1 p-4 rounded-xl
          bg-[var(--card)] border border-[var(--border)]
          text-[var(--foreground)]
          placeholder:text-[var(--muted-foreground)]
          focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
          transition"
        />

        {/* 🧊 Select */}
        <motion.select
          whileFocus={{ scale: 1.05 }}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-xl px-4
          bg-[var(--card)] border border-[var(--border)]
          text-[var(--foreground)]
          focus:outline-none cursor-pointer"
        >
          <option value="High">🔥 High</option>
          <option value="Medium">⚡ Medium</option>
          <option value="Low">🌿 Low</option>
        </motion.select>

        {/* 🚀 Add Button */}
        <motion.button
          ref={buttonRef}
          whileTap={{ scale: 0.92 }}
          onClick={handleAdd}
          className="px-6 rounded-xl font-medium text-white
          bg-[var(--primary)]
          hover:brightness-110
          active:scale-95
          transition-all duration-300"
        >
          Add
        </motion.button>

      </div>

    </div>
  );
}