//уровень DALL(уровень доступа к данным)
//создаем объект ,в котором мы будем описывать методы в заимодействия с сервером
import axios from "axios";
import {LoginType} from "../features/Login/Login";
import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";



const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        'API-KEY': '32f2b4a6-0672-4ffa-9026-e2be7bac6297',
        'Authorization': 'Bearer 135ac670-1610-4ceb-9e7c-a034c967a192'
    }
})


export const authApi = {
    login(data:LoginType) {
        const promise = instance.post<ResponseType<{userId: number}>>('/auth/login', data)
        return promise
    },
    logOut() {
        return instance.delete<ResponseType>(`/auth/login`)
    },
    me() {
        const promise = instance.get<ResponseType<UserType>>('/auth/me')
        return promise
    },

}
////////////////////////////////////////////////////////////////////////////////////////

// 1
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// 2
export const todolistsApi = createApi({
    // 3
    reducerPath: 'todolistsApi',
    // 4
    baseQuery: fetchBaseQuery ({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: headers => {
            headers.set('API-KEY', `${process.env.REACT_APP_API_KEY}`)
            headers.set('Authorization', `Bearer ${localStorage.getItem('sn-token')}`)
        },
    }),
    // 5
    endpoints: build => {
        return {
            // 6
            getTodolists: build.query<any[], void>({
                query: () => {
                    return {
                        url: 'todo-lists',
                        method: 'GET',
                    }
                },
            }),
        }
    },
})

// 7
export const { useGetTodolistsQuery } = todolistsApi



//////////////////////////////////////////////////////////////////////////////////////
export const _todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('/todo-lists',)
        return promise
    },
    createTodolist(payload: { title: string }) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', payload)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, payload: { title: string }) {
        const promise = instance.put<ResponseType>(`/todo-lists/${todolistId}`, payload)
        return promise
    },
    ///////
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { title: string; todolistId: string }) {
        const {title, todolistId} = payload

        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(payload: { todolistId: string; taskId: string }) {
        const {taskId, todolistId} = payload

        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    // updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModelType }) {
    //     const {taskId, todolistId, model} = payload
    //     //!!!Нужно деструктурировать, так как принимается один уровень вложенности {}. т.к. model тоже {}
    //     return instance.put<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    // },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    }
}

export type UserType={
    id: number
    email: string
    login: string
}

export type FieldError = {
    error: string
    field: string
}


export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: D
}


export enum TaskStatus {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}


type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}


////////////////////////


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

//ЗАМЕНИЛИ НА ОДИН ТИП

// export type ResponseType<T = {}> = {
//     resultCode: number
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     data: T
// }

// type CreateResponseType = {
//     resultCode: number
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     data: {
//         item: TodolistType
//     }
// }
//
// type DeleteResponseType = {
//     resultCode: number
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     data: {}
// }
//
// type UpdateResponseType = {
//     resultCode: number
//     fieldsErrors: Array<string>
//     messages: Array<string>
//     data: {}
// }
//
