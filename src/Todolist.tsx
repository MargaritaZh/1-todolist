import React, {useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTasks: (taskId: number) => void;
    // changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export function Todolist(props: TodolistPropsType) {
    const {title,
        tasks,
        removeTasks,
        // changeFilter
    } = props;

    //UI logic (которая влияет на жизнь компаненты, но не относится к глобальным даным)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter=(filter: FilterValuesType)=>{
        setFilter(filter)
    }

    const getFilteredTasks = (allTasts: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        if (filterValue === "active") {
            return allTasts.filter(t => t.isDone === false)
        } else if (filterValue === "complited") {
            return allTasts.filter(t => t.isDone === true)
        } else {
            return allTasts
        }
        // switch (filterValue) {
        //     case "active":
        //         return allTasts.filter(t => t.isDone === false)
        //     case "complited":
        //         return allTasts.filter(t => t.isDone === true)
        //     default:
        //         return allTasts
        // }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks,filter)


    const taskslist: JSX.Element = filteredTasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>
            {filteredTasks.map((task) => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={"X"} onclickHandler={() => removeTasks(task.id)}/>
                        {/*<button onClick={() => removeTasks(task.id)}>x</button>*/}
                    </li>
                )
            })}
        </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {taskslist}
            <div>
                <Button title={'All'} onclickHandler={()=>changeFilter("all")}/>
                <Button title={'Active'} onclickHandler={()=>changeFilter("active")}/>
                <Button title={'Completed'} onclickHandler={()=>changeFilter("complited")}/>
            </div>
        </div>
    )

}