import {Link} from 'react-router-dom'
export function Navigation(){
    return(
        <div className="flex justify-between py-3">
            <Link to="/tasks">
                <h1 className="mb-4 border-b pb-4 text-3xl leading-tight">Tasks App</h1>
            </Link>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg">
                <Link to="/tasks-create">create task</Link>
            </button>
        </div>
    )
}