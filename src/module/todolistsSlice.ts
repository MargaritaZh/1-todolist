import {todolistAPI, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppStatus
} from "../app/appSlice";
import {getTasksTC, Result_Code} from "./tasksSlice";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";
import {createSlice, current} from "@reduxjs/toolkit";


// type ActionsType =
//     SetTodosActionType
// | DeleteTodolistActionType
// | CreateTodolistActionType
// | ChangeTodolistTitleActionType
// | ChangeTodolistFilterActionType
// | SetAppStatusActionType
// | ReturnType<typeof changeEntityStatusAC>
// | SetAppErrorActionType
// | ClearDataActionType


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

// const initialState: TodolistDomainType[] = []


export const todolistsSlice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: (create) => {
        return {
            deleteTodolist: create.reducer<{ id: string }>((state, action) => {
                //ПРОСМОТРЕТЬ STATE текущий
                // debugger
                // const a = current(state)


                // return state.filter(tl => tl.id !== action.payload.id)
                //заменим Мутабельно
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            createTodolist: create.reducer<{ todolist: TodolistType }>((state, action) => {
                // const newTodo: TodolistDomainType = {
                //     ...action.payload.todolist,
                //     filter: "all",
                //     entityStatus: "idle"
                // }
                // return [newTodo, ...state] // логика по добавлению тудулист

                //МУТАБЕЛЬНО
                const newTodolist: TodolistDomainType = {
                    //деструктуризацией достаем все свойства с сервера и добавляем новые
                    ...action.payload.todolist,
                    filter: "all",
                    entityStatus: "idle"
                }
                state.unshift(newTodolist)
            }),

            upDateTodolistTitle: create.reducer<{ id: string, newTitle: string }>((state, action) => {
                // return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)

                //МУТАБЕЛЬНО
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state[index].title = action.payload.newTitle
            }),

            changeEntityStatus: create.reducer<{
                todolistId: string,
                entityStatus: RequestStatusType
            }>((state, action) => {
                // return state.map(el => el.id === action.payload.id ? {
                //     ...el,
                //     entityStatus: action.payload.entityStatus
                // } : el)

                //МУТАБЕЛЬНО
                const index = state.findIndex(todo => todo.id === action.payload.todolistId)
                if (index !== -1) state[index].entityStatus = action.payload.entityStatus
            }),
            changeFilter: create.reducer<{ todolistId: string, filter: FilterValuesType }>((state, action) => {
                // return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)

                //МУТАБЕЛЬНО
                const index = state.findIndex(todo => todo.id === action.payload.todolistId)
                if (index !== -1) state[index].filter = action.payload.filter
            }),

            setTodos: create.reducer<{ todolists: Array<TodolistType> }>((state, action) => {
                // return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))

                //!!!ЗАМЕНМ НА
                return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))

            }),

            clearTodosData: create.reducer((state, action) => {
                return []
            })

        }
    },
    selectors: {
        selectTodolists: state => state,
        selectFilter:state=>state.map(todo=>todo.filter),
        selectEntityStatus:state=>state.map(todo=>todo.entityStatus),
    }
})

export const todolistsReducer = todolistsSlice.reducer
export const {
    deleteTodolist,
    createTodolist,
    upDateTodolistTitle,
    changeEntityStatus,
    setTodos,
    changeFilter,
    clearTodosData
} = todolistsSlice.actions

export const {selectTodolists,selectFilter,selectEntityStatus}=todolistsSlice.selectors


// export const todolistReducer = (state = initialState, action: ActionsType): TodolistDomainType[] => {
//     switch (action.type) {
///////////////
// case
// "SET-TODOLISTS"
// :
// {
//     return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
//     //из объекта action достали данные, приходящие с сервера todolists
// }
////////////
// case 'DELETE-TODOLIST': {
//     return state.filter(tl => tl.id !== action.payload.id) // логика по удалению тудулиста
// }

// case
// 'CREATE-TODOLIST'
// :
// {
//     const newTodo: TodolistDomainType = {
//         ...action.payload.todolist,
//         filter: "all",
//         entityStatus: "idle"
//     }
//     return [newTodo, ...state] // логика по добавлению тудулиста
// }
// case
// "CHANGE-TODOLIST-TITLE"
// :
// {
//     return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
// }

// case
// "CHANGE-TODOLIST-FIlTER"
// :
// {
//     return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
// }
// case
// "CHANGE-ENTITY-STATUS"
// :
// {
//     return state.map(el => el.id === action.payload.id ? {
//         ...el,
//         entityStatus: action.payload.entityStatus
//     } : el)
// }
// case
// "CLEA-DATA"
// :
// return []
// default:
//     return state
// throw new Error("I don't understand this type")
//     }
// }

////


//зачистим state в store после вылогинивания,чтобы у нас был пустой инициализацинный state

// export const clearTodosDataAC = () => ({type: "CLEA-DATA"} as const)
// export type ClearDataActionType = ReturnType<typeof clearTodosDataAC>


///////////создaдим TC для получения тодолистов с сервера
// export type SetTodosActionType = ReturnType<typeof setTodosAC>
//as const фиксирует посимвольно значение строки type в action, чтобы в дальнейшем распозвать это значение в switch case,(в нашем случае зафиксировали весь объект просто, а можно только строку type сделать as const)
// export const setTodosAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", payload: {todolists}} as const)


//ЗАДИСПАТЧИМ САНКУ В САНКЕ И уберем useEfffect и запрос за тасками в компаненте todolist
export const getTodolistsTC = () => (dispatch: ThunkDispatch<AppRootStateType, unknown, ReturnType<typeof setTodos> | ReturnType<typeof setAppStatus>>) => {
    //покажи крутилку
    dispatch(setAppStatus({status: "loading"}))

    todolistAPI.getTodolists().then((res) => {
        //!!для getTodolistsTC проверку на ResultCode делать не надо

        //после запроса на сервер вбрасываем полученные тодолисты с сервера в AC ,
        // чтобы в редьюсеры передать актуальные данные, обновить ,засетать тодолисты с сервера в state
        dispatch(setTodos({todolists: res.data}))
        //убери крутилку
        dispatch(setAppStatus({status: "succeeded"}))
        return res.data
    }).then((todos) => {
        todos.forEach((tl) => {
            dispatch(getTasksTC(tl.id))
        })
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
////////////////////
//для изменения статуса тододиста,чтобы управлять disabled нужных элементов

// export const changeEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
//     type: 'CHANGE-ENTITY-STATUS', payload: {id: todolistId, entityStatus}
// } as const)


///////////////////////

// export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
//
// const deleteTodolistAC = (todolistId: string) => ({
//     type: 'DELETE-TODOLIST', payload: {id: todolistId,}
// } as const)


export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {

    //покажи крутилку
    dispatch(setAppStatus({status: "loading"}))
    //измени emptity статус тодолиста для управления  disaibled нужныx элементов
    dispatch(changeEntityStatus({todolistId: todolistId, entityStatus: "loading"}))

    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === Result_Code.SUCCESS) {
                //
                dispatch(deleteTodolist({id: todolistId}))
                //убери крутилку
                dispatch(setAppStatus({status: "succeeded"}))
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
            dispatch(changeEntityStatus({todolistId: todolistId, entityStatus: "idle"}))

        })
}


/////////////
// export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>

// export const createTodolistAC = (title: string) => {
//теперь нам пришел новый созданный тодолист с сервера
// export const createTodolistAC = (todolist: TodolistType) => ({
//     type: 'CREATE-TODOLIST', payload: {todolist}
// } as const)

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    //покажи крутилку
    dispatch(setAppStatus({status: "loading"}))

    todolistAPI.createTodolist({title})
        .then(res => {
            //res.data.data.item

            if (res.data.resultCode === Result_Code.SUCCESS) {
                // нам вернется новый объект тодолист с СЕРВЕРА,его и передаем в AC
                dispatch(createTodolist({todolist: res.data.data.item}))
                //убери крутилку
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


/////////
// type ChangeTodolistTitleActionType = ReturnType<typeof upDateTodolistTitleAC>

// export const upDateTodolistTitleAC = (todolistId: string, newTitle: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title: newTitle}
// } as const)

export const upDateTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    //покажи крутилку
    dispatch(setAppStatus({status: "loading"}))
    todolistAPI.updateTodolist(todolistId, {title}).then(res => {
        if (res.data.resultCode === Result_Code.SUCCESS) {
            //сначало обновим на сервере, затем в BLL
            dispatch(upDateTodolistTitle({id: todolistId, newTitle: title}))
            //убери крутилку
            dispatch(setAppStatus({status: "succeeded"}))
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
// type ChangeTodolistFilterActionType = ReturnType<typeof changeFilterAC>
//
// export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => ({
//     type: "CHANGE-TODOLIST-FIlTER", payload: {id: todolistId, filter: filter}
// } as const)










