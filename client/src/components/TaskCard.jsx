import { useNavigate } from "react-router-dom"

export function TaskCard({task}) {
    const navigate = useNavigate()
    return (
        <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
            onClick={() => navigate(`/tasks/${task.id}`)}
        >
            <h1 className="font-bold uppercase">{task.title}</h1>
            <p>{task.description}</p>
            <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" disabled checked={task.done}/>
        </div>
    )
}