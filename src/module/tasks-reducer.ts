import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {DomainTask, todolistAPI} from "../api/api";

export type removeTaskActionType = ReturnType<typeof removeTasktAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    removeTaskActionType
    | AddTasksActionTye
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetTasksActionType


// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }

type TaskType = DomainTask & {
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        ///////////////////
        //этот кейс в двух редьюсерах используется AC setTodolistAC , т.к. по tlId создается ключ в объекте тасок
        case "SET-TODOLISTS": {
            //создадим копию state=>пустого {}
            const copyState = {...state}
            //пееберем пришедший с сервера тодолист
            // и в пустом {} создадим по ключу [tl.id] =>пустой массив
            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })

            //возвращаем получившийся объект { [tl1.id]:[],[tl2.id]:[],[tl3.id]:[] }
            return copyState
        }

        /////////////

        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks.map(ts => ({...ts, isDone: false}))
            }
        }
        //////////////
        case "CREATE-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]:[{...action.payload.task,isDone:false},...state[action.payload.task.todoListId]]
            }
        }
        /////////////////

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
///////////////////////////////////

export type SetTasksActionType = ReturnType<typeof setTasksAC>

export const setTasksAC = (tasks: Array<DomainTask>, todolistId: string) => {
    return {
        type: "SET-TASKS",
        payload: {
            tasks,
            todolistId
        }
    } as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {

        //res.data.items-массив тасок

        dispatch(setTasksAC(res.data.items, todolistId))
    })
}
////////////////////

type AddTasksActionTye = ReturnType<typeof addTasksAC>

// export const addTasksAC = (todolistId: string, title: string) => {
export const addTasksAC = (task: DomainTask) => {
    return {
        // type:'ADD-TASK', todolistId: todolistId, title: title,
        type: 'CREATE-TASK',
        payload: {task}
    } as const
}

export const createTasksTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask({title, todolistId}).then((res) => {
        //(res.data.data.item)
        dispatch(addTasksAC(res.data.data.item))
    })
}



