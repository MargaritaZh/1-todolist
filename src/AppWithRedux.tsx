import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
    addTodolistsAC,
    changeFilterAC,
    deleteTodolistAC,
    todolistReducer,
    upDateTodolistAC
} from "./module/todolists-reducer";
import {addTasktAC, changeTaskStatusAC, changeTaskTitleAC, removeTasktAC, tasksReducer} from "./module/tasks-reducer";


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
    const todolistId1 = v1()
    const todolistId2 = v1()


    const [todolists, dispatchToTodolistRedicer] = useReducer(todolistReducer,
        [
            {
                id: todolistId1,
                title: "What to learn?",
                filter: "all",
            },
            {
                id: todolistId2,
                title: "What to buy?",
                filter: "all",
            },
        ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
            [todolistId1]: [
                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "JS & TS", isDone: true},
                {id: v1(), title: "React", isDone: false}],
            [todolistId2]: [
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Cheeps", isDone: true},
                {id: v1(), title: "Fish", isDone: false}],
        }
    )

    //change logic
    //delete
    const removeTask = (todolistId: string, taskId: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)
        // })


        const action = removeTasktAC(todolistId,taskId)
        dispatchToTasksReducer(action)
    }

    //create
    const addTask = (todolistId: string, title: string) => {
        // const newTask: TaskType = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        //
        // setTasks({
        //     ...tasks,
        //     [todolistId]: [newTask, ...tasks[todolistId]]
        // })

        const action = addTasktAC(todolistId,title)
        dispatchToTasksReducer(action)

    }
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        // setTodolists([...todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el)])

        const action = changeFilterAC(todolistId,filter)
        dispatchToTodolistRedicer(action)

    }

    //UI logic
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {

        // setTasks(
        //     {
        //         ...tasks,
        //         [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
        //     })

        const action = changeTaskStatusAC(todolistId, taskId, newIsDoneValue)
        dispatchToTasksReducer(action)
    }

    const deleteTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(tl => tl.id !== todolistId))
        //        delete tasks[todolistId]

        const action = deleteTodolistAC(todolistId)
        dispatchToTodolistRedicer(action)
    }

    const addTodolists = (title: string) => {
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
        const action = addTodolistsAC(title)
        dispatchToTodolistRedicer(action)
        dispatchToTasksReducer(action)

    }
    const upDateTask = (todolistId: string, id: string, newTitle: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el)})

        const action = changeTaskTitleAC(todolistId, id, newTitle)
        dispatchToTasksReducer(action)
    }


    const upDateTodolist = (todolistId: string, newTitle: string) => {
        // setTodolists(
        //     todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))

        const action=upDateTodolistAC(todolistId,newTitle)
        dispatchToTodolistRedicer(action)

    }

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

                                let tasksForTodolist = tasks[todolist.id]

                                if (todolist.filter === 'active') {
                                    tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                                }

                                if (todolist.filter === 'completed') {
                                    tasksForTodolist = tasks[todolist.id].filter(task => task.isDone)
                                }
                                return (
                                    <Grid item key={todolist.id}>
                                        <Paper elevation={6} sx={{padding: "30px"}}>
                                            <Todolist
                                                key={todolist.id}
                                                todolistId={todolist.id}
                                                title={todolist.title}
                                                tasks={tasksForTodolist}
                                                removeTask={removeTask}
                                                addTask={addTask}
                                                changeFilter={changeFilter}
                                                filter={todolist.filter}
                                                changeTaskStatus={changeTaskStatus}
                                                deleteTodolist={deleteTodolist}
                                                upDateTask={upDateTask}
                                                upDateTodolist={upDateTodolist}
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