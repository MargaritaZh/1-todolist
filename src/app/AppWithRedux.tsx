import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    createTodolistTC, getTodolistsTC, TodolistDomainType,
} from "../module/todolists-reducer";
import { useAppDispatch, useAppSelector} from "../module/store";
import {TodolistWithRedux} from "../TodolistWithRedux";
import LinearProgress from '@mui/material/LinearProgress';
import {CustomizedSnackbars} from "../components/ErrorSnackBar/CustomizedSnackbars";




type ThemeMode = "dark" | "light"

function AppWithRedux() {

    const status=useAppSelector(state => state.app.status)


    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)

    const dispatch = useAppDispatch()

    useEffect(()=>{
            dispatch(getTodolistsTC())
    },[])


    const addTodolists =useCallback( (title: string) => {
        dispatch(createTodolistTC(title))
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
                    {status==="loading"&& <LinearProgress color="secondary" />}
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

                    <CustomizedSnackbars/>
                </Container>
            </ThemeProvider>
        </div>
    );
}


export default AppWithRedux