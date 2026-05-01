"use client";

export default function TodoItem({
  task,
  toggleTask,
  deleteTask
}: any) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl bg-white">

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4"
        />

        <p className={task.completed ? "line-through text-gray-400" : ""}>
          {task.text}
        </p>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-gray-400 hover:text-red-500"
      >
        🗑
      </button>
    </div>
  );
}