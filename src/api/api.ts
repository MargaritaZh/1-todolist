//уровень DALL(уровень доступа к данным)
//создаем объект ,в котором мы будем описывать методы в заимодействия с сервером
import axios from "axios";
import {CreateTodolist, DeleteTodolist, UpdateTodolist} from "../stories/todolists-api.stories";

const config = {
    withCredentials: true,
    headers: {
        'API-KEY': '2301ad51-5dfc-4feb-b807-a9eea7d3c61e'
    }
}


type CreateTodolistPayloadType = {
    title: string
}

type UpdateTodolistPayloadType={
    title: string
}



export const todolistAPI = {
    getTodolists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', config)
        return promise
    },
    createTodolist(payload: CreateTodolistPayloadType) {
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, config)
        return promise
    },
    deleteTodolist(todolistId:string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, config)
        return promise
    },
    updateTodolist(todolistId:string,payload:UpdateTodolistPayloadType){
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, payload, config)
        return promise
    }

}