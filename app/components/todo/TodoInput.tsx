"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function TodoInput({ addTask }: any) {
  const [text, setText] = useState("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
const inputWrapperRef = useRef<HTMLDivElement>(null);
  // 🎯 button animation
const handleAdd = () => {
  if (!text.trim()) return;

  addTask(text);

  const tl = gsap.timeline();

  tl.to(buttonRef.current, { scale: 0.9, duration: 0.1 })
    .to(buttonRef.current, {
      scale: 1.15,
      duration: 0.25,
      ease: "back.out(3)"
    })
    .to(buttonRef.current, {
      boxShadow: "0 0 25px rgba(34,197,94,0)",
      duration: 0.4
    });

  setText("");
};
const handleFocus = () => {
  if (!inputWrapperRef.current) return;

  gsap.to(inputWrapperRef.current, {
    borderColor: "#16a34a",
    boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
    duration: 0.3
  });
};

const handleBlur = () => {
  if (!inputWrapperRef.current) return;

  gsap.to(inputWrapperRef.current, {
    borderColor: "#e5e7eb",
    boxShadow: "0 0 0 0px #0d9488",
    duration: 0.3
  });
};

const handleHover = () => {
  gsap.to(buttonRef.current, {
    scale: 1.05,
    boxShadow: "0 10px 20px #0d9488",
    duration: 0.3
  });
};

const handleLeave = () => {
  gsap.to(buttonRef.current, {
    scale: 1,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    duration: 0.3
  });
};
  return (
    <div className="flex gap-3 mb-4">
   <div
  ref={inputWrapperRef}
  className="flex-1 border rounded-xl px-1 py-1 transition-all"
>
  <input
    ref={inputRef}
    value={text}
    onChange={(e) => setText(e.target.value)}
    onFocus={handleFocus}
    onBlur={handleBlur}
    onKeyDown={(e) => e.key === "Enter" && handleAdd()}
    placeholder="What needs to be done?"
    className="w-full px-3 py-2 outline-none bg-transparent"
  />
</div>

  <button
  ref={buttonRef}
  onClick={handleAdd}
  onMouseEnter={handleHover}
  onMouseLeave={handleLeave}
  className="bg-green-600 text-white px-5 rounded-xl font-medium"
  style={{ backgroundColor: "#0d9488" }}
>
  Add
</button>
    </div>
  );
}