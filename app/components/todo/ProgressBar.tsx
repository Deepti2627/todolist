export default function ProgressBar({tasks}:any){

const done=tasks.filter((t:any)=>t.completed).length
const percent=tasks.length
? (done/tasks.length)*100
:0

return(

<div className="mb-8">

<div className="flex justify-between mb-2">
<span>Progress</span>
<span>{done}/{tasks.length}</span>
</div>

<div className="bg-gray-200 h-4 rounded-full overflow-hidden">
<div
style={{width:`${percent}%`}}
className="bg-indigo-500 h-full transition-all"
/>
</div>

</div>

)
}