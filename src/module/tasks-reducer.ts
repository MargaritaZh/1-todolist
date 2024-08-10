import {TasksStateType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

export type removeTaskActionType = ReturnType<typeof removeTasktAC>
export type addTaskACActionType = ReturnType<typeof addTasktAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionsType = removeTaskActionType | addTaskACActionType | changeTaskStatusActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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




