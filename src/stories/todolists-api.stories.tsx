import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API',
}

const config = {
    withCredentials: true,
    headers: {
        'API-KEY': '2301ad51-5dfc-4feb-b807-a9eea7d3c61e'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', config).then((res) => {
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
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, config).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = ""

        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, config).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = "da4c51b9-4549-4517-a443-70616d4f8ed5"

        const payload = {
            title: "new todolist title"
        }

        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, payload, config).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}