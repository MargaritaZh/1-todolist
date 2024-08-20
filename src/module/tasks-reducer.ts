import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type removeTaskActionType = ReturnType<typeof removeTasktAC>
export type addTaskACActionType = ReturnType<typeof addTasktAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    removeTaskActionType
    | addTaskACActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType



const initialState: TasksStateType = {}

export const tasksReducer = (state= initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            //из App
            // setTasks({
            //     ...tasks,
            //     [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)
            // })

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            //из App
            // const newTask: TaskType = {
            //     id: v1(),
            //     title: title,
            //     isDone: false
            // }
            //
            // setTasks({
            //     ...tasks,
            //     [todolistId]: [newTask, ...tasks[todolistId]]
            // })

            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            //из App
            // setTasks(
            //     {
            //         ...tasks,
            //         [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
            //     })

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.newIsDoneValue
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            //из App
            // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el)})
            //
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            // setTasks({
            //     ...tasks, [newId]: [
            //         {id: v1(), title: "HTML & CSS", isDone: true},
            //         {id: v1(), title: "JS & TS", isDone: true},
            //         {id: v1(), title: "React", isDone: false}]
            // })

            return {
                ...state,
                // [v1()]: []
                //создали генерацию общего id в caмом AC addTodolistsAC в возвращаемом объекте action
                [action.payload.todolistId]: []
            }
        }

        case "REMOVE-TODOLIST": {
            //из APP
            // delete tasks[todolistId]
            const copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }

        default:
            return state
        // throw new Error("I don't understand this type")
    }
}

//as const фиксирует посимвольно значение строки type в action, чтобы в дальнейшем распозвать это значение в switch case,(в нашем случае зафиксировали весь объект просто, а можно только строку type сделать as const)

export const removeTasktAC = (todolistId: string, taskId: string) => {
    return {
        // type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId,
        type: 'REMOVE-TASK', todolistId, taskId,
    } as const
}


export const addTasktAC = (todolistId: string, title: string) => {
    return {
        // type: 'REMOVE-TASK', todolistId: todolistId, title: title,
        type: 'ADD-TASK', todolistId, title,
    } as const
}


export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
    return {
        // type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId,newIsDoneValue:newIsDoneValue

        type: 'CHANGE-TASK-STATUS', todolistId, taskId, newIsDoneValue
    } as const
}


export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        // type: 'CHANGE-TASK-TITLE', todolistId: todolistId, taskId: taskId,newTitle:newTitle
        type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle
    } as const
}




