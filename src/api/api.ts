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
        'API-KEY': '0e722c87-8616-40b4-b1ad-8b9e95b179d9',
         'Authorization':'Bearer bf7dccd0-29b7-40af-8605-7c937b49c2b0'
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

    // getTasks(todolistId: string) {
    //     const promise = instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`,)
    //     return promise
    // },
    // createTask(payload: CreateTaskPayloadType,todolistId:string) {
    //     const promise = instance.post<ResponseType<{item:TaskApiType}>>(`/todo-lists/${todolistId}/tasks`, payload)
    //     return promise
    // },
    // deleteTask(todolistId: string,taskId:string) {
    //     const promise = instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    //     return promise
    // },
    // updateTask(todolistId: string, taskId:string,payload: UpdateTaskType) {
    //     const promise = instance.put<ResponseType<{item:TaskApiType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, payload)
    //     return promise
    // },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { title: string; todolistId: string }) {
        const { title, todolistId } = payload

        return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title })
    },
    deleteTask(payload: { todolistId: string; taskId: string }) {
        const { taskId, todolistId } = payload
        return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
        const { taskId, todolistId, model } = payload
        return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

}

export type FieldError = {
    error: string
    field: string
}

export type BaseResponse<D = {}> = {
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

export type DomainTask = {
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
export type UpdateTaskModel = {
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
}



type GetTasksResponse = {
    items: Array<DomainTask>
    totalCount: number
    error: string | null
}



////////////////////////
type CreateTodolistPayloadType = {
    title: string
}

type UpdateTodolistPayloadType = {
    title: string
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
