"use client";

import TodoItem from "./TodoItem";

export default function TodoList({
  tasks,
  toggleTask,
  deleteTask
}: any) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-6">
          No tasks
        </p>
      ) : (
        tasks.map((task: any) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        ))
      )}
    </div>
  );
}