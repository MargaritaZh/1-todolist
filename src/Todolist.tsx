import React from "react";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = ({
                             title,
                             tasks
                         }: TodolistPropsType) => {
    // 1.
    // const title = props.title
    // const tasks = props.tasks
    // 2.
    // const {title, tasks}=props


    // const tasksList: Array<JSX.Element> = []
    // for (let i = 0; i < tasks.length; i++) {
    //     tasksList.push(
    //         <li>
    //             <input type="checkbox" checked={tasks[i].isDone}/>
    //             <span>{tasks[i].title}</span>
    //         </li>
    //     )
    // }

    const tasksList: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
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