import React, { memo, useCallback, useEffect, useMemo} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import {filterButtonContainerSx} from "./Todolist.styles";
import {TodolistType} from "./AppWithRedux";
import { useAppDispatch, useAppSelector} from "./module/store";
import {createTaskTC, getTasksTC} from "./module/tasks-reducer";
import {changeFilterAC, deleteTodolistAC, upDateTodolistAC} from "./module/todolists-reducer";
import {ButtonPropsType} from "./Button";
import {TaskWithRedux} from "./TaskWithRedux";

type TodolistPropsType = {
    todolist: TodolistType
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export const TodolistWithRedux = React.memo(function (props: TodolistPropsType) {

    console.log("TodolistWithRedux")

    const {todolist} = props;

    const {id, title, filter} = todolist

    let tasks = useAppSelector<Array<TaskType>>(state => state.tasks[id])

    const dispatch = useAppDispatch()


    useEffect(() => {

       dispatch(getTasksTC(id))

    }, []);



    const changeFilterTasksHandler = useCallback((filter: FilterValuesType) => {
        // changeFilter(props.todolistId, filter)
        dispatch(changeFilterAC(id, filter))
    }, [dispatch])



    //запоминает результат выз
    tasks = useMemo(() => {
        if (filter === "active") {
            tasks = tasks.filter(t => t.isDone === false)
        } else if (filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true)
        }
        return tasks
    }, [tasks,filter])



    const taskslist: JSX.Element = tasks.length === 0
        ? <span>Your tasklist is empty</span>
        :
        <List>
            {tasks?.map((task) => {
                return (
                    <TaskWithRedux
                        key={task.id}
                        todolistId={todolist.id}
                        task={task}

                    />)

            })}
        </List>

    const addTaskHandler = (title: string) => {
        ///
        dispatch(createTaskTC(title,id))
    }


    const upDateTodolistHandler = useCallback((newTitle: string) => {
        // upDateTodolist(props.todolistId, newTitle)
        dispatch(upDateTodolistAC(id, newTitle))
    }, [dispatch])

    return (

        <div className="todolist">
            <div>
                {/*<h3>{title}</h3>*/}
                <EditableSpan oldTitle={title} upDateItem={upDateTodolistHandler}/>

                {/*<button onClick={() => props.deleteTodolist(props.todolistId)}>X</button>*/}
                <IconButton aria-label="delete"
                    // onClick={() => props.deleteTodolist(props.todolistId)}>
                            onClick={() => dispatch(deleteTodolistAC(id))}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>

            </div>

            <AddItemForm addItem={addTaskHandler}/>

            {taskslist}

            <Box sx={filterButtonContainerSx}>

                <ButtonWithMemoPropsType
                    title={"All"}
                    variant={filter === "all" ? "contained" : "outlined"}
                    color={"inherit"}
                    onclickHandler={() => changeFilterTasksHandler("all")}
                />
                <ButtonWithMemoPropsType
                    title={"Active"}
                    variant={filter === "active" ? "contained" : "outlined"}
                    color={"primary"}
                    onclickHandler={() => changeFilterTasksHandler("active")}
                />
                <ButtonWithMemoPropsType
                    title={"Completed"}
                    variant={filter === "completed" ? "contained" : "outlined"}
                    color={"secondary"}
                    onclickHandler={() => changeFilterTasksHandler("completed")}
                />
            </Box>
        </div>
    )
})

type  ButtonWithMemoPropsType = ButtonPropsType & {
    variant: string;
    color: "inherit" | "primary" | "secondary";
    onclickHandler: () => void;
}

const ButtonWithMemoPropsType = memo(({title, variant, color, onclickHandler, ...props}: ButtonWithMemoPropsType) => {
    return (
        <Button
            variant={variant as "text" | "outlined" | "contained"}
            color={color}
            onClick={onclickHandler}
            {...props}
        >
            {title}
        </Button>
    )
})