import TodoItem from "./TodoItem";


export default function TodoList({
tasks,
toggleTask,
deleteTask
}:any){

return(
<div className="space-y-4">

{tasks.map((task:any)=>(
<TodoItem
key={task.id}
task={task}
toggleTask={toggleTask}
deleteTask={deleteTask}
/>
))}

</div>
)
}