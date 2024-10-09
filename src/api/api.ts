//уровень DALL(уровень доступа к данным)
//создаем объект ,в котором мы будем описывать методы в заимодействия с сервером
import axios from "axios";


// const config = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': '2301ad51-5dfc-4feb-b807-a9eea7d3c61e'
//     }
// }

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        'API-KEY': '2301ad51-5dfc-4feb-b807-a9eea7d3c61e'
    }

})


export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistApiType>>('/todo-lists',)
        return promise
    },
    createTodolist(payload: CreateTodolistPayloadType) {
        const promise = instance.post<ResponseType<{ item: TodolistApiType }>>('/todo-lists', payload)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, payload: UpdateTodolistPayloadType) {
        const promise = instance.put<ResponseType>(`/todo-lists/${todolistId}`, payload)
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`,)
        return promise
    },
    createTask(payload: CreateTaskPayloadType,todolistId:string) {
        const promise = instance.post<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, payload)
        return promise
    },
    deleteTask(todolistId: string,taskId:string) {
        const promise = instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    updateTask(todolistId: string, taskId:string,payload: UpdateTaskType) {
        const promise = instance.put<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, payload)
        return promise
    },
}



export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

type CreateTaskPayloadType={
    title:string
}

export type UpdateTaskType = {
    title: string
}

////////////////////////
type CreateTodolistPayloadType = {
    title: string
}

type UpdateTodolistPayloadType = {
    title: string
}

type UpdateTaskPayloadType={
    title:string
}

export type TodolistApiType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}

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
