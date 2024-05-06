import React from "react";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (taskId: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = (
    {
        title,
        tasks,
        removeTasks
    }: TodolistPropsType) => {

    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>removeTasks(task.id)}>x</button>
            </li>
        )
    })

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {/*<li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
                {/*<li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
                {/*<li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
                {tasksList}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}