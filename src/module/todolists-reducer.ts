import {todolistAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../app/app-reducer";
import {Result_Code} from "./tasks-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


type ActionsType =
    SetTodosActionType
    | DeleteTodolistActionType
    | CreateTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetAppStatusActionType
    | ReturnType<typeof changeEntityStatusAC>
    | SetAppErrorActionType


//добавили в типы filter, то что не возвращает сервер
// type TodolistType = {
//     id: string
//     title: string
//     addedDate: string
//     order: number
// }

export type FilterValuesType = "all" | "active" | "completed"
// type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        ///////////////
        case "SET-TODOLISTS": {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
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
                entityStatus: "idle"
            }
            return [newTodo, ...state] // логика по добавлению тудулиста
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case "CHANGE-TODOLIST-FIlTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        case "CHANGE-ENTITY-STATUS": {
            return state.map(el => el.id === action.payload.id ? {
                ...el,
                entityStatus: action.payload.entityStatus
            } : el)
        }
        default:
            return state
        // throw new Error("I don't understand this type")
    }
}


///////////создaдим TC для получения тодолистов с сервера
export type SetTodosActionType = ReturnType<typeof setTodosAC>
//as const фиксирует посимвольно значение строки type в action, чтобы в дальнейшем распозвать это значение в switch case,(в нашем случае зафиксировали весь объект просто, а можно только строку type сделать as const)
export const setTodosAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", payload: {todolists}} as const)

export const getTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    //покажи крутилку
    dispatch(setAppStatusAC("loading"))

    todolistAPI.getTodolists().then((res) => {
//!!для getTodolistsTC проверку на ResultCode делать не надо

        //после запроса на сервер вбрасываем полученные тодолисты с сервера в AC ,
        // чтобы в редьюсеры передать актуальные данные, обновить ,засетать тодолисты с сервера в state
        dispatch(setTodosAC(res.data))
        //убери крутилку
        dispatch(setAppStatusAC("succeeded"))
    })
}
////////////////////
//для изменения статуса тододиста,чтобы управлять disabled нужных элементов

export const changeEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-ENTITY-STATUS', payload: {id: todolistId, entityStatus}
} as const)


///////////////////////

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>

const deleteTodolistAC = (todolistId: string) => ({
    type: 'DELETE-TODOLIST', payload: {id: todolistId,}
} as const)

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {

    //покажи крутилку
    dispatch(setAppStatusAC("loading"))
    //измени emptity статус тодолиста для управления  disaibled нужныx элементов
    dispatch(changeEntityStatusAC(todolistId, "loading"))

    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === Result_Code.SUCCESS) {
                //
                dispatch(deleteTodolistAC(todolistId))
                //убери крутилку
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            // dispatch(setAppErrorAC(error.messages))
            //убрать крутилку
            // dispatch(setAppStatusAC("failed"))

            //узкий кейс
            //измени emptity статус тодолиста для управления  disaibled нужныx элементов/РАЗДИЗЭЙБЛИТЬ
            dispatch(changeEntityStatusAC(todolistId, "idle"))

        })
}


/////////////
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>

// export const createTodolistAC = (title: string) => {
//теперь нам пришел новый созданный тодолист с сервера
export const createTodolistAC = (todolist: TodolistType) => ({
    type: 'CREATE-TODOLIST', payload: {todolist}
} as const)

export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    //покажи крутилку
    dispatch(setAppStatusAC("loading"))

    todolistAPI.createTodolist({title})
        .then(res => {
            //res.data.data.item

            if (res.data.resultCode === Result_Code.SUCCESS) {
                // нам вернется новый объект тодолист с СЕРВЕРА,его и передаем в AC
                dispatch(createTodolistAC(res.data.data.item))
                //убери крутилку
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


/////////
type ChangeTodolistTitleActionType = ReturnType<typeof upDateTodolistTitleAC>

export const upDateTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title: newTitle}
} as const)

export const upDateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    //покажи крутилку
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(todolistId, {title}).then(res => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
            //сначало обновим на сервере, затем в BLL
            dispatch(upDateTodolistTitleAC(todolistId, title))
            //убери крутилку
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

/////////

//!!МЫ НЕ ДЕЛАЛИ ДЛЯ ФИЛЬТРАЦИИ TC, так как фильтрация пока происходит на UI/В дальнейшем сделаем на сервере в этом проекте
type ChangeTodolistFilterActionType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FIlTER", payload: {id: todolistId, filter: filter}
} as const)










