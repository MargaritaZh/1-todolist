import {v1} from 'uuid'
import {todolistAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type ActionsType =
    SetTodosActionType
    | DeleteTodolistActionType
    | CreateTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export type FilterValuesType = "all" | "active" | "completed"

//добавили в типы filter, то что не возвращает сервер
// type TodolistType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }

export type TodolistDomainType = TodolistType & {
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
        ////////////
        case 'DELETE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id) // логика по удалению тудулиста
        }

        case 'CREATE-TODOLIST': {
            const newTodo: TodolistDomainType = {
                ...action.payload.todolist,
                filter: "all",
            }
            return [newTodo, ...state] // логика по добавлению тудулиста
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case "CHANGE-TODOLIST-FIlTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }

        default:
            return state
        // throw new Error("I don't understand this type")
    }
}


///////////создaдим TC для получения тодолистов с сервера
export type SetTodosActionType = ReturnType<typeof setTodosAC>
//as const фиксирует посимвольно значение строки type в action, чтобы в дальнейшем распозвать это значение в switch case,(в нашем случае зафиксировали весь объект просто, а можно только строку type сделать as const)
export const setTodosAC = (todolists: Array<TodolistType>) => ({
    type: "SET-TODOLISTS",
    payload: {
        todolists
    }
} as const)

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then((res) => {
        //после запроса на сервер вбрасываем полученные тодолисты с сервера в AC ,
        // чтобы в редьюсеры передать актуальные данные, обновить ,засетать тодолисты с сервера в state
        dispatch(setTodosAC(res.data))
    })
}
////////////////////

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
const deleteTodolistAC = (todolistId: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {
            id: todolistId,
        }
    } as const
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then(res => {
        //
        dispatch(deleteTodolistAC(todolistId))
    })
}


/////////////
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>

// export const createTodolistAC = (title: string) => {
//теперь нам пришел новый созданный тодолист с сервера
export const createTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'CREATE-TODOLIST',
        payload: {
            todolist
        },
    } as const
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist({title}).then(res => {
        //res.data.data.item
        // нам вернется новый объект тодолист с СЕРВЕРА,его и передаем в AC
        dispatch(createTodolistAC(res.data.data.item))
    })
}


/////////
type ChangeTodolistTitleActionType = ReturnType<typeof upDateTodolistTitleAC>

export const upDateTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title: newTitle,
        },
    } as const
}

export const upDateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {

    todolistAPI.updateTodolist(todolistId, {title}).then(res => {
        //сначало обновим а сервере, затем в BLL
        dispatch(upDateTodolistTitleAC(todolistId, title))


    })


}

/////////

//!!МЫ НЕ ДЕЛАЛИ ДЛЯ ФИЛЬТРАЦИИ TC, так как фильтрация пока происходит на UI/В дальнейшем сделаем на сервере в этом проекте
type ChangeTodolistFilterActionType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FIlTER",
        payload: {
            id: todolistId,
            filter: filter,
        },
    } as const
}










