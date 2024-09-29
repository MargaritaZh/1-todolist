import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const payload = {
            title: "new todolist"
        }
        todolistAPI.createTodolist(payload).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = "e73979c8-09d2-4ed8-9961-f52ba5df406f"

        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = "8d1e80ca-68a2-48ee-8f3e-9e7366e15138"

        const payload = {
            title: "new  title"
        }

        todolistAPI.updateTodolist(todolistId,payload).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}