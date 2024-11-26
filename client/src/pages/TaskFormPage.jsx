import { useForm } from 'react-hook-form'
import { createTask, deleteTask, getTask, updateTask } from '../api/tasks.api'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {toast} from 'react-hot-toast'

export function TaskFormPage() {
    const { 
        register, 
        handleSubmit, 
        formState: {errors},
        setValue
    } = useForm()
    const inputStyle = "bg-zinc-700 p-3 rounded-lg block w-full mb-3"
    const successTask = (message) => toast.success(message, {position: "bottom-center"})
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateTask(params.id, data)
            successTask('Updated task')
        } else {
            const res = await createTask(data)
            if (res.status == "201") {
                setError('')
                successTask("Created task")
            } else {
                setError(res.statusText)
            }
        }
        navigate('/tasks')
    })
    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const {data: {title, description, done}} = await getTask(params.id)
                setValue('title', title)
                setValue('description', description)
                setValue('done', done)
            }
        }
        loadTask()
    }, [])
    return (
        <div className='max-w-xl mx-auto'>
            <p>{error}</p>
            <form onSubmit={onSubmit}>
                <input
                className={inputStyle}
                    type="text"
                    placeholder="title"
                    {...register("title", { required: true })}
                />
                {errors.title && <span>Title is required</span>}
                <textarea 
                    rows="3" 
                    placeholder="description"
                    {...register("description")}
                    className={inputStyle}
                ></textarea>
                <div className="flex items-center mb-4">
                    <input 
                        type="checkbox"
                        placeholder='done'
                        {...register('done')}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Done</label>
                </div>
                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
            </form>
            {params.id && (
                <div className='flex justify-end'>
                    < button
                    className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                    onClick={async () => {
                        const accepted = window.confirm(`Do you want to delete task?`)
                        if (accepted) {
                            await deleteTask(params.id)
                            successTask("Deleted task")
                            navigate("/tasks")
                        }
                    }}>Delete</button>
                </div>
            )}
        </div>
    )
}