"use client";
import { Trash2, Check } from "lucide-react";

export default function TodoItem({ task, toggleTask, deleteTask }: any) {
  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-teal-100/50 hover:shadow-md hover:shadow-gray-100 transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* CUSTOM CHECKBOX: Matches circular style in Screenrecording_20260504_110839.mp4 */}
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.completed 
              ? "bg-[#14b8a6] border-[#14b8a6] shadow-lg shadow-teal-500/20" 
              : "border-gray-200 group-hover:border-teal-400 bg-white"
          }`}
        >
          {task.completed && (
            <Check size={16} className="text-white" strokeWidth={3} />
          )}
        </button>

        {/* TASK TEXT: Opacity change and line-through seen in video */}
        <span className={`text-[15px] font-semibold transition-all duration-500 ${
          task.completed ? "line-through text-gray-300 opacity-60" : "text-gray-700"
        }`}>
          {task.text}
        </span>
      </div>

      {/* DELETE BUTTON: Appears on hover as shown in the app workflow */}
      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}