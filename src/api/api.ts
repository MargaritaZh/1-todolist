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
        const promise = instance.get<Array<TodolistType>>('/todo-lists',)
        return promise
    },
    createTodolist(payload: CreateTodolistPayloadType) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', payload)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, payload: UpdateTodolistPayloadType) {
        const promise = instance.put<ResponseType>(`/todo-lists/${todolistId}`, payload)
        return promise
    }
}
type CreateTodolistPayloadType = {
    title: string
}

type UpdateTodolistPayloadType = {
    title: string
}

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T={}>= {
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
