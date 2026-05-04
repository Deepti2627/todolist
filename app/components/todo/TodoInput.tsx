"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function TodoInput({ addTask }: any) {
  const [text, setText] = useState("");

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText("");
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-3 mb-10">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 h-14 px-6 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-200 placeholder:text-gray-400 text-gray-700"
      />
      <button
        type="submit"
        className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 rounded-2xl font-bold flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-lg shadow-teal-500/20 active:shadow-sm"
      >
        <Plus size={22} strokeWidth={3} />
        <span className="text-[15px]">Add</span>
      </button>
    </form>
  );
}