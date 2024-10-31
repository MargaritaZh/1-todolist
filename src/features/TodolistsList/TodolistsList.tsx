import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {TodolistWithRedux} from "./Todolist/TodolistWithRedux";
import React, {useCallback} from "react";
import {useAppDispatch, useAppSelector} from "../../module/store";
import {createTodolistTC, TodolistDomainType} from "../../module/todolists-reducer";

type PropsType = {
    demo?: boolean
}


export const TodolistsList: React.FC<PropsType> = ({demo = false, ...props}) => {

    const dispatch = useAppDispatch()

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)

    const addTodolists = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])



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