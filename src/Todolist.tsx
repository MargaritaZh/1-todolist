import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";

type TodolistPropsType = {
    filter: FilterValuesType
    todolistId: string
    title: string;
    tasks: Array<TaskType>;
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, newIsDoneValue: boolean) => void
    deleteTodolist: (todolistId: string) => void
    upDateTask: (todolistId: string, id: string, newTitle: string) => void
    upDateTodolist: (todolistId: string, newTitle: string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export function Todolist(props: TodolistPropsType) {
    const {
        todolistId,
        title,
        tasks,
        removeTask,
        addTask,
        filter,
        changeFilter,
        changeTaskStatus,
        deleteTodolist,
        upDateTodolist,

    } = props;


    // const [newTaskTitle, setNewTaskTitle] = useState("")

    // const [error, setError] = useState<string | null>(null)


    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(props.todolistId, filter)
    }

    const getFilteredTasks = (allTasts: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        if (filterValue === "active") {
            return allTasts.filter(t => t.isDone === false)
        } else if (filterValue === "completed") {
            return allTasts.filter(t => t.isDone === true)
        } else {
            return allTasts
        }
    }
    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

    ////

    // const addNewTaskHandler = () => {
    //     const trimmednewTaskTitle = newTaskTitle.trim()
    //     if (trimmednewTaskTitle !== "") {
    //         addTask(todolistId,newTaskTitle)
    //     } else {
    //         setError("Title is required")
    //     }
    //     setNewTaskTitle("")
    // }
    ////

    // const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Enter" && newTaskTitle) {
    //         addNewTaskHandler()
    //     }
    // }

    // const changeNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     error && setError(null)
    //     setNewTaskTitle(e.currentTarget.value)
    // }

    // const isAddBthDisabled = newTaskTitle.length === 0 || newTaskTitle.trim().length >= 15




    const taskslist: JSX.Element = filteredTasks.length === 0
        ? <span>Your tasklist is empty</span>
        : <ul>
            {filteredTasks.map((task) => {

                const removeTaskHandler = () => removeTask(todolistId, task.id)

                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
                }

                const upDateItemHandler = (newTitle: string) => {
                    props.upDateTask(props.todolistId, task.id, newTitle)
                }


                return <Task taskId={task.id}
                             isDone={task.isDone}
                             taskTitle={task.title}
                             changeTaskStatusHandler={changeTaskStatusHandler}
                             upDateItemHandler={upDateItemHandler}
                             removeTaskHandler={removeTaskHandler}
                />
                    // <li key={task.id}>
                    //     <input
                    //         type="checkbox"
                    //         checked={task.isDone}
                    //         onChange={changeTaskStatusHandler}
                    //     />
                    //     {/*<span className={task.isDone ? "is-done" : "task"}>{task.title}</span>*/}
                    //     <EditableSpan
                    //         oldTitle={task.title}
                    //         isDone={task.isDone}
                    //         upDateItem={upDateItemHandler}/>
                    //     <Button title={"X"} onclickHandler={removeTaskHandler}/>
                    //     {/*<button onClick={() => removeTasks(task.id)}>x</button>*/}
                    // </li>

            })}
        </ul>

    const addTaskHandler = (title: string) => {
        addTask(props.todolistId, title)
    }

    const upDateTodolistHandler = (newTitle: string) => {
        upDateTodolist(props.todolistId, newTitle)
    }

    return (

        <div className="todolist">
            <div>
                <EditableSpan oldTitle={title} upDateItem={upDateTodolistHandler}/>
                {/*<h3>{title}</h3>*/}
                <button onClick={() => props.deleteTodolist(props.todolistId)}>X</button>
            </div>

            <AddItemForm addItem={addTaskHandler}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        value={newTaskTitle}*/}
            {/*        onChange={changeNewTaskTitleHandler}*/}
            {/*        onKeyUp={addTaskOnKeyUpHandler}*/}
            {/*        className={error ? "task-input-error" : ""}*/}
            {/*    />*/}
            {/*    <Button*/}
            {/*        title={'+'}*/}
            {/*        onclickHandler={addNewTaskHandler}*/}
            {/*        disabled={isAddBthDisabled}*/}
            {/*    />*/}
            {/*    {error && <div style={{color: "red"}}>{error}</div>}*/}

            {/*    {newTaskTitle.trim().length > 10 && newTaskTitle.length < 15 &&*/}
            {/*        <div>Recommended task length 10 characters</div>}*/}

            {/*    {newTaskTitle.trim().length >= 15 && <div style={{color: "red"}}>Title is too long</div>}*/}
            {/*</div>*/}


            {taskslist}
            <div>
                <Button
                    title={'All'}
                    onclickHandler={() => changeFilterTasksHandler("all")}
                    classes={filter === "all" ? "bth-active-filter" : ""}/>
                <Button title={'Active'}
                        onclickHandler={() => changeFilterTasksHandler("active")}
                        classes={filter === "active" ? "bth-active-filter" : ""}
                />
                <Button title={'Completed'}
                        onclickHandler={() => changeFilterTasksHandler("completed")}
                        classes={filter === "completed" ? "bth-active-filter" : ""}
                />
            </div>
        </div>

    )

}