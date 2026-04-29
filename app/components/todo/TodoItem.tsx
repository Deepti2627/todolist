import { Trash2 } from "lucide-react";

export default function TodoItem({
task,
toggleTask,
deleteTask
}:any){

const colors:any={
High:"bg-red-100 text-red-600",
Medium:"bg-yellow-100 text-yellow-700",
Low:"bg-green-100 text-green-700"
}

return(

<div className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center hover:-translate-y-1 transition">

<div className="flex items-center gap-4">

<input
type="checkbox"
checked={task.completed}
onChange={()=>toggleTask(task.id)}
className="w-5 h-5"
/>

<div>
<p className={`${task.completed && "line-through text-gray-400"} font-medium`}>
{task.text}
</p>

<span className={`px-3 py-1 text-sm rounded-full ${colors[task.priority]}`}>
{task.priority}
</span>

</div>

</div>

<button
onClick={()=>deleteTask(task.id)}
className="text-red-500"
>
<Trash2/>
</button>

</div>

)
}