import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {TodolistWithRedux} from "./Todolist/TodolistWithRedux";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../module/store";
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from "../../module/todolists-reducer";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}


export const TodolistsList: React.FC<PropsType> = ({demo = false, ...props}) => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)

    const addTodolists = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


    useEffect(() => {
    //2

     //если пользователь не зарегистрирован, обрываем логику,не даем сделать запрос
       if(!isLoggedIn){
           return
       }
        dispatch(getTodolistsTC())
    }, [])


    //достали значение isLoggedIn из стэйта, и если false-пользователь не залогинен то,
    //перенаправим его на страницу логинизации
    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }


    return(<>
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

        </>

    )





}