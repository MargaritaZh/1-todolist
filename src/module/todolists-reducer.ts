import {v1} from 'uuid'
import {todolistAPI, TodolistApiType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    payload: {
        id: string
    }

}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
        todolistId: string
    }
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FIlTER"
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodosActionType


export type FilterValuesType = "all" | "active" | "completed"

//добавили в типы filter, то что не возвращает сервер
export type TodolistDomainType = TodolistApiType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        ///////////////
        case "SET-TODOLISTS": {
            return action.payload.todolists.map(tl => ({...tl, filter: "all"}))
            //из объекта action достали данные, приходящие с сервера todolists
        }
        //////////////
        // case 'REMOVE-TODOLIST': {
        //     // setTodolists(todolists.filter(tl => tl.id !== todolistId))
        //     return state.filter(tl => tl.id !== action.payload.id) // логика по удалению тудулиста
        // }
        // case 'ADD-TODOLIST': {
        //
        //     // const newId = v1()
        //     // const newTodo: TodolistType = {
        //     //     id: newId,
        //     //     title: title,
        //     //     filter: "all",
        //     // }
        //     // setTodolists([...todolists,newTodo])
        //
        //
        //     ////создали генерацию общего id в caмом AC addTodolistsAC в возвращаемом объекте action
        //
        //     // const newId = v1()
        //     const newTodo: TodolistType = {
        //         // id: newId,
        //         id: action.payload.todolistId,
        //         title: action.payload.title,
        //         filter: "all",
        //     }
        //     return [...state, newTodo] // логика по добавлению тудулиста
        // }
        // case "CHANGE-TODOLIST-TITLE": {
        //     // setTodolists(
        //     //     todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
        //
        //     return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        // }
        //
        // case "CHANGE-TODOLIST-FIlTER": {
        //     // setTodolists([...todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el)])
        //
        //     return [...state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)]
        // }

        default:
            return state
        // throw new Error("I don't understand this type")
    }
}

//as const фиксирует посимвольно значение строки type в action, чтобы в дальнейшем распозвать это значение в switch case,(в нашем случае зафиксировали весь объект просто, а можно только строку type сделать as const)

export const deleteTodolistAC = (todolistID1: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID1,
        }
    } as const
}

export const addTodolistsAC = (newTitle: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: newTitle,
            todolistId: v1()
        },
    } as const
}

export const upDateTodolistAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title: newTitle,
        },
    } as const
}


export const changeFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FIlTER",
        payload: {
            id: todolistId,
            filter: filter,
        },
    } as const
}

///////////создодим AC для получения тодолистов с сервера

export type SetTodosActionType = ReturnType<typeof setTodosAC>

export const setTodosAC = (todolists: Array<TodolistApiType>) => ({
    type: "SET-TODOLISTS",
    payload: {todolists}
} as const)


export const getTodolistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType, extArg: unknown) => {
    todolistAPI.getTodolists().then((res) => {
        //после запроса на сервер вбрасываем полученные тодолисты с сервера в AC ,
        // чтобы в редьюсеры передать актуальные данные, обновить ,засетать тодолисты с сервера в state
        dispatch(setTodosAC(res.data))
    })
}
////////////////////






