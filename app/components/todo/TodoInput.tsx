"use client";

import { useState } from "react";

export default function TodoInput({addTask}:any){

const [text,setText]=useState("");
const [priority,setPriority]=useState("Medium");

return(
<div className="mb-6">

<div className="flex gap-3">

<input
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Add a task..."
className="flex-1 p-4 rounded-2xl border focus:outline-none"
/>

<select
value={priority}
onChange={(e)=>setPriority(e.target.value)}
className="rounded-2xl px-4 border"
>
<option>High</option>
<option>Medium</option>
<option>Low</option>
</select>

<button
onClick={()=>{
addTask(text,priority)
setText("")
}}
className="bg-indigo-600 text-white px-6 rounded-2xl hover:scale-105 transition"
>
Add
</button>

</div>

</div>
)
}