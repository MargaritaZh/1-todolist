import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    // changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export function Todolist(props: TodolistPropsType) {
    const {
        title,
        tasks,
        removeTask,
        addTask,
        // changeFilter,
        changeTaskStatus,
    } = props;

    //UI logic (которая влияет на жизнь компаненты, но не относится к глобальным даным)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const [newTaskTitle, setNewTaskTitle] = useState("")

    console.log(newTaskTitle)

    const changeFilter = (filter: FilterValuesType) => {
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
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    ////

    const addNewTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle("")
    }
    ////

    const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTaskTitle) {
            addNewTaskHandler()
        }
    }

    const changeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const isAddBthDisabled = newTaskTitle.length === 0 || newTaskTitle.length > 15

    const taskslist: JSX.Element = filteredTasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>
            {filteredTasks.map((task) => {

                const removeTaskHandler = () => removeTask(task.id)

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(task.id, e.currentTarget.checked)
                }
                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span className={task.isDone ? "is-done" : "task"}>{task.title}</span>
                        <Button title={"X"} onclickHandler={removeTaskHandler}/>
                        {/*<button onClick={() => removeTasks(task.id)}>x</button>*/}
                    </li>
                )
            })}
        </ul>

    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={changeNewTaskTitleHandler}
                    onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button
                    title={'+'}
                    onclickHandler={addNewTaskHandler}
                    disabled={isAddBthDisabled}
                />
                {newTaskTitle.length > 10 && <div>Recommended task length 10 characters</div>}
            </div>
            {taskslist}
            <div>
                <Button
                    title={'All'}
                    onclickHandler={() => changeFilter("all")} classes={filter === "all" ? "bth-active-filter" : ""}/>
                <Button title={'Active'}
                        onclickHandler={() => changeFilter("active")}
                        classes={filter === "active" ? "bth-active-filter" : ""}
                />
                <Button title={'Completed'}
                        onclickHandler={() => changeFilter("complited")}
                        classes={filter === "complited" ? "bth-active-filter" : ""}
                />
            </div>
        </div>
    )

}