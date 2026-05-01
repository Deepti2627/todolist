import { ClipboardList } from "lucide-react";
import TodoItem from "./TodoItem";

export default function TodoList({
  tasks,
  toggleTask,
  deleteTask,
}: any) {

if (tasks.length === 0) {
  return (
    <div className="text-center py-10 text-gray-400">
      <ClipboardList className="mx-auto mb-3 opacity-40" size={50} />
      <p className="font-semibold text-gray-500">No tasks yet</p>
      <p className="text-sm">Add your first task to get started</p>
    </div>
  );
}

  return (
    <div className="space-y-3">
      {tasks.map((task: any) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}