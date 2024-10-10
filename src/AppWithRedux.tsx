import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    addTodolistsAC, getTodolistsTC, TodolistDomainType,
} from "./module/todolists-reducer";


import { useAppDispatch, useAppSelector} from "./module/store";
import {TodolistWithRedux} from "./TodolistWithRedux";


export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

type ThemeMode = "dark" | "light"

function AppWithRedux() {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)


    const dispatch = useAppDispatch()

    useEffect(()=>{
            dispatch(getTodolistsTC)
    },[])


    const addTodolists =useCallback( (title: string) => {
        //один  и тот же ключ в двух местах
        // const newId = v1()
        //
        // const newTodo: TodolistType = {
        //     id: newId,
        //     title: title,
        //     filter: "all",
        // }
        // setTodolists([newTodo, ...todolists])
        // setTasks({
        //     ...tasks, [newId]: [
        //         {id: v1(), title: "HTML & CSS", isDone: true},
        //         {id: v1(), title: "JS & TS", isDone: true},
        //         {id: v1(), title: "React", isDone: false}]
        // })

        //--
        // const action = addTodolistsAC(title)
        // dispatchToTodolistRedicer(action)
        // dispatchToTasksReducer(action)
        //--
        const action = addTodolistsAC(title)
        dispatch(action)

    },[dispatch])


    const [themeMode, setThemeMode] = useState<ThemeMode>("light")

    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: '#cf45cf',
            },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode == "light" ? "dark" : "light")
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container fixed>
                    <ButtonAppBar changeModeHandler={changeModeHandler}/>

                    <Grid container sx={{marginBottom: "20px"}}>
                        <AddItemForm addItem={addTodolists}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {
                            todolists.map(todolist => {

                                // let tasksForTodolist = tasks[todolist.id]
                                //
                                // if (todolist.filter === 'active') {
                                //     tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                                // }
                                //
                                // if (todolist.filter === 'completed') {
                                //     tasksForTodolist = tasks[todolist.id].filter(task => task.isDone)
                                // }
                                return (
                                    <Grid item key={todolist.id}>
                                        <Paper elevation={6} sx={{padding: "30px"}}>
                                            <TodolistWithRedux
                                                //key указан в верхней обертке grid
                                                // key={todolist.id}
                                                todolist={todolist}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}


export default AppWithRedux