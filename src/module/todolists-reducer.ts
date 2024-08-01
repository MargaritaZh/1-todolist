import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from "../App";

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


let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]


export const todolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            // setTodolists(todolists.filter(tl => tl.id !== todolistId))
            return state.filter(tl => tl.id !== action.payload.id) // логика по удалению тудулиста
        }
        case 'ADD-TODOLIST': {

            // const newId = v1()
            // const newTodo: TodolistType = {
            //     id: newId,
            //     title: title,
            //     filter: "all",
            // }
            // setTodolists([...todolists,newTodo])

            const newId = v1()
            const newTodo: TodolistType = {
                id: newId,
                title: action.payload.title,
                filter: "all",
            }
            return [...state, newTodo] // логика по добавлению тудулиста
        }
        case "CHANGE-TODOLIST-TITLE": {
            // setTodolists(
            //     todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))

            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }

        case "CHANGE-TODOLIST-FIlTER": {
            // setTodolists([...todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el)])

            return [...state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)]
        }

        default:
            return state
        // throw new Error("I don't understand this type")
    }
}


export const deleteTodolistAC=(todolistID1:string)=>{
    return  {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID1,
        }
    } as const
}

export const addTodolistsAC=()=>{
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    } as const
}

export const upDateTodolistAC=(todolistId:string)=>{
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title: 'New Todolist',
        },
    } as const
}


export const changeFilterAC=(todolistId2:string)=>{
    return  {
        type: "CHANGE-TODOLIST-FIlTER",
        payload: {
            id: todolistId2,
            filter: 'completed',
        },
    } as const
}





