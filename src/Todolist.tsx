import React from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTasks: (taskId: number) => void;
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export function Todolist(props: TodolistPropsType) {
    const {title, tasks, removeTasks, changeFilter} = props;


    const taskslist: JSX.Element = tasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>
            {tasks.map((task) => {
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