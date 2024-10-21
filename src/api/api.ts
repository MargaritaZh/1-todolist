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
        'API-KEY': '251eb60b-136c-4989-9d33-ab9255802b03',
        'Authorization': 'Bearer c3172b3f-5b4a-4150-aee7-afae66c64b0e'
    }

})


export const todolistAPI = {
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
    /////////
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: { title: string; todolistId: string }) {
        const {title, todolistId} = payload

        return instance.post<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(payload: { todolistId: string; taskId: string }) {
        const {taskId, todolistId} = payload
        return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
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
