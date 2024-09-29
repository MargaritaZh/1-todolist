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
        const promise = instance.get('/todo-lists',)
        return promise
    },
    createTodolist(payload: CreateTodolistPayloadType) {
        const promise = instance.post('/todo-lists', payload)
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete(`/todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, payload: UpdateTodolistPayloadType) {
        const promise = instance.put(`/todo-lists/${todolistId}`, payload)
        return promise
    }
}
type CreateTodolistPayloadType = {
    title: string
}

type UpdateTodolistPayloadType = {
    title: string
}