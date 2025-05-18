import { useState } from 'react'

function App() {
    const [tasks, setTasks] = useState([])
    const [taskname, setTaskName] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [filter, setFilter] = useState('all')

    const handleaddTask = (e) => {
        e.preventDefault()
        if (!taskname || !dueDate) return;
        const newTask = {
            id: Date.now(),
            taskname,
            dueDate,
            completed: false
        }
        setTasks((prev) => [...prev, newTask])
        console.log(newTask)
        console.log(tasks)
        setDueDate("")
        setTaskName("")
    }

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed
        if (filter === "incomplete") return !task.completed
        return true
    })

    const toggleCompletion = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };


    return (
        <div className='bg-gray-400 h-screen flex justify-center items-center'>
            <div className='bg-gray-600 w-[550px] h-auto border-2 shadow-2xl flex justify-start items-center flex-col rounded-md'>
                <h1 className='text-4xl font-bold mb-8 mt-3'>Remainder App</h1>
                <form className='w-[350px] ' onSubmit={handleaddTask}>
                    <label className='font-bold text-xl'>TASK NAME:</label>
                    <input className='mt-3 mb-3 p-8 font-bold text-2xl border-black border-2' type='text' placeholder='Enter the Task' value={taskname} onChange={(e) => setTaskName(e.target.value)} />
                    <label className='font-bold text-xl'>DUE DATE:</label>
                    <input className='border-black border-2 w-[380px] cursor-pointer mt-4 p-8 font-bold text-2xl' type='date' placeholder='Due Date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    <div className="flex justify-center">
                        <button className='mb-5 p-5 font-bold text-2xl mt-5 cursor-pointer bg-green-500 rounded-4xl w-[150px]' type='submit'>Add</button>
                    </div>
                </form>
                <div className='flex font-bold text-xl w-full mt-5'>
                    <button
                        className={`flex-1 py-3 border cursor-pointer border-black border-r-0 rounded-l-lg ${filter === "all" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-300"
                            } transition`}
                        onClick={() => setFilter("all")}
                    >
                        ALL
                    </button>
                    <button
                        className={`flex-1 py-3 border cursor-pointer border-black border-r-0 ${filter === "completed" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-300"
                            } transition`}
                        onClick={() => setFilter("completed")}
                    >
                        COMPLETED
                    </button>
                    <button
                        className={`flex-1 py-3 border cursor-pointer border-black rounded-r-lg ${filter === "incomplete" ? "bg-blue-400 text-white" : "bg-gray-200 hover:bg-gray-300"
                            } transition`}
                        onClick={() => setFilter("incomplete")}
                    >
                        INCOMPLETE
                    </button>
                </div>
                <ul className="w-full mt-6">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <li key={task.id} className="flex items-center border-b border-gray-300 last:border-b-0 px-4 py-3">
                                <div className="gap-[100px] flex flex-row">
                                    <span className={`font-semibold text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
                                        {task.taskname}
                                    </span>
                                    <span className="text-sm text-gray-500">{task.dueDate}</span>
                                </div>
                                <button
                                    className={`ml-4 px-4 py-2 rounded-lg font-bold transition 
            ${task.completed ? "bg-red-400 hover:bg-red-500 text-white" : "bg-green-400 hover:bg-green-500 text-white"}`}
                                    onClick={() => toggleCompletion(task.id)}
                                >
                                    {task.completed ? 'MARK INCOMPLETE' : 'MARK COMPLETE'}
                                </button>
                            </li>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-6">No TASKS</div>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default App
