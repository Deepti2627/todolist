 // Assuming you have a helper to fetch tasks

import TodoApp from "./components/todo/TodoApp";
import { getTasks } from "./lib/data";

export default async function Page() {
  const initialTasks = await getTasks();
  
  return (
    <main>
      <TodoApp initialTasks={initialTasks} />
    </main>
  );
}