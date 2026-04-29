"use client";

import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";


export type Task = {
 id:number;
 text:string;
 completed:boolean;
 priority:string;
};

export default function TodoApp(){

const [tasks,setTasks]=useState<Task[]>([
{
id:1,
text:"Design homepage",
completed:false,
priority:"High"
},
{
id:2,
text:"Drink water",
completed:true,
priority:"Low"
}
])

const addTask=(text:string,priority:string)=>{
if(!text.trim()) return;

setTasks([
...tasks,
{
id:Date.now(),
text,
completed:false,
priority
}
])
}

const toggleTask=(id:number)=>{
setTasks(
tasks.map(task=>
task.id===id
? {...task,completed:!task.completed}
:task
)
)
}

const deleteTask=(id:number)=>{
setTasks(tasks.filter(task=>task.id!==id))
}

return(
<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-50 to-cyan-100 flex justify-center items-center p-6">

<div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

<h1 className="text-5xl font-bold text-center mb-2">
📝 Doodle Todo
</h1>

<p className="text-center text-gray-500 mb-8">
Stay organized in a playful way
</p>

<ProgressBar tasks={tasks}/>

<TodoInput addTask={addTask}/>

<TodoList
tasks={tasks}
toggleTask={toggleTask}
deleteTask={deleteTask}
/>

</div>

</div>
)
}