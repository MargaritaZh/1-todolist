import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Task} from "./Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


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
        upDateTodolist,

    } = props;


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
                {/*<h3>{title}</h3>*/}
                <EditableSpan oldTitle={title} upDateItem={upDateTodolistHandler}/>

                {/*<button onClick={() => props.deleteTodolist(props.todolistId)}>X</button>*/}
                <IconButton aria-label="delete"
                            onClick={() => props.deleteTodolist(props.todolistId)}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>

            </div>

            <AddItemForm addItem={addTaskHandler}/>

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