// import React, {useEffect, useState} from 'react'
// import {todolistAPI} from "../api/api";
//
// export default {
//     title: 'API',
// }
//
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         // здесь мы будем делать запрос и ответ закидывать в стейт.
//         // который в виде строки будем отображать в div-ке
//         todolistAPI.getTodolists()
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
//
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const payload = {
//             title: "new todolist"
//         }
//         todolistAPI.createTodolist(payload).then((res) => {
//             setState(res.data)
//         })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
//
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//
//         const todolistId = "e73979c8-09d2-4ed8-9961-f52ba5df406f"
//
//         todolistAPI.deleteTodolist(todolistId).then((res) => {
//             setState(res.data)
//         })
//
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
//
// export const UpdateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//
//         const todolistId = "8d1e80ca-68a2-48ee-8f3e-9e7366e15138"
//
//         const payload = {
//             title: "new  title"
//         }
//
//         todolistAPI.updateTodolist(todolistId, payload).then((res) => {
//             setState(res.data)
//         })
//
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
// ////////////////////////////////////////////////////////
//
// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         // здесь мы будем делать запрос и ответ закидывать в стейт.
//         // который в виде строки будем отображать в div-ке
//
//         const todolistId = "8d1e80ca-68a2-48ee-8f3e-9e7366e15138"
//
//         todolistAPI.getTasks(todolistId)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
//
//
// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const payload = {
//             title: "new task"
//         }
//
//         const todolistId = "8d1e80ca-68a2-48ee-8f3e-9e7366e15138"
//         todolistAPI.createTask(payload, todolistId).then((res) => {
//             setState(res.data)
//         })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
//
// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//
//         const todolistId = "8d1e80ca-68a2-48ee-8f3e-9e7366e15138"
//
//         const taskId = "e4a5fdd6-e7bd-4075-baa2-f8b4a216d36e"
//
//         todolistAPI.deleteTask(todolistId, taskId).then((res) => {
//             setState(res.data)
//         })
//
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
//
// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//
//         const todolistId = "8d1e80ca-68a2-48ee-8f3e-9e7366e15138"
//
//         const payload = {
//             title: "new task title"
//         }
//
//         const taskId = "9d2b3aeb-a971-4afb-a4ca-6c1d3afe87a5"
//
//         todolistAPI.updateTask(todolistId, taskId, payload).then((res) => {
//             setState(res.data)
//         })
//
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }