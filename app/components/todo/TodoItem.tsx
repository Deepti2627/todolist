import { Trash2 } from "lucide-react";

export default function TodoItem({
  task,
  toggleTask,
  deleteTask,
}: any) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border rounded-lg bg-[#faf9f7] hover:shadow transition">

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4 accent-teal-600 cursor-pointer"
        />

        <span
          className={`text-sm ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-700"
          }`}
        >
          {task.text}
        </span>
      </div>

      <button
  onClick={() => deleteTask(task.id)}
  className="text-gray-400 hover:text-red-500"
>
  <Trash2 size={16} />
</button>
    </div>
  );
}