"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function TodoInput({ addTask }: any) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask(text);
    setText("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 h-11 px-4 rounded-md border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-200 outline-none transition"
      />

<button
  onClick={handleAdd}
  className="bg-teal-600 text-white px-5 rounded-md shadow flex items-center gap-2 hover:bg-teal-700 transition"
>
  <Plus size={16} />
  Add
</button>
    </div>
  );
}