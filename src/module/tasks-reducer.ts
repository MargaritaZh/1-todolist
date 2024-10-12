import {Dispatch} from "redux";
import {TaskStatus, TaskType, todolistAPI, UpdateTaskModel} from "../api/api";
import {AppRootStateType} from "./store";
import {AddTodolistActionType, DeleteTodolistActionType, SetTodosActionType} from "./todolists-reducer";


export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    DeleteTaskActionType
    | AddTasksActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodosActionType
    | SetTasksActionType


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
            //пееберем пришедший с сервера массив тодолистов,чтобы по id тодолистов создать в {} тасок
            // и в пустом {} создадим свойства с  ключами [tl.id] => и заченями пустой массив
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
                [action.payload.todolistId]: action.payload.tasks
            }
        }
        //////////////
        case "DELETE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        }

        case "CREATE-TASK": {
            return {
                ...state,
                [action.payload.task.todoListId]: [{
                    ...action.payload.task,
                }, ...state[action.payload.task.todoListId]]
            }
        }
        ///////////////


        // case "CHANGE-TASK-STATUS": {
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
        //             ...el,
        //             isDone: action.newIsDoneValue
        //         } : el)
        //     }
        //
        // }
        // case "CHANGE-TASK-TITLE": {
        //     //из App
        //     // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el)})
        //     //
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
        //             ...el,
        //             title: action.newTitle
        //         } : el)
        //     }
        // }
        // case "ADD-TODOLIST": {
        // setTasks({
        //     ...tasks, [newId]: [
        //         {id: v1(), title: "HTML & CSS", isDone: true},
        //         {id: v1(), title: "JS & TS", isDone: true},
        //         {id: v1(), title: "React", isDone: false}]
        // })
        //
        //     return {
        //         ...state,
        //         // [v1()]: []
        //         //создали генерацию общего id в caмом AC addTodolistsAC в возвращаемом объекте action
        //         [action.payload.todolistId]: []
        //     }
        // }

        // case "REMOVE-TODOLIST": {
        //     //из APP
        //     // delete tasks[todolistId]
        //     const copyState = {...state}
        //     delete copyState[action.payload.id]
        //     return copyState
        // }

        default:
            return state
        // throw new Error("I don't understand this type")
    }
}

//as const фиксирует посимвольно значение строки type в action, чтобы в дальнейшем распозвать это значение в switch case,(в нашем случае зафиксировали весь объект просто, а можно только строку type сделать as const)


export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        // type: 'CHANGE-TASK-TITLE', todolistId: todolistId, taskId: taskId,newTitle:newTitle
        type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle
    } as const
}
///////////////////////////////////

export type SetTasksActionType = ReturnType<typeof setTasksAC>

const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
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

type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>

const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'DELETE-TASK', todolistId, taskId,
    } as const
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask({todolistId, taskId}).then((res) => {
        //res.data.data
        dispatch(deleteTaskAC(todolistId, taskId))
    })
}
//////////////////
type AddTasksActionType = ReturnType<typeof createTasksAC>

//ПЕРЕПИСЫВАЕМ AC , теперь мы получаем готовую таску с СЕРВЕРА!!
// export const addTasksAC = (todolistId: string, title: string) => {
const createTasksAC = (task: TaskType) => {
    return {
        type: 'CREATE-TASK',
        payload: {task}
    } as const
}

export const createTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask({title, todolistId}).then((res) => {
        //(res.data.data.item)
        //ОТПРАВИМ УЖЕ ПОЛУЧЕННУЮ ТАСКУ, ГОТОВЫЙ {c таской} c сервера в AC
        dispatch(createTasksAC(res.data.data.item))
    })
}


////////////////////


export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {
    return {
        // type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId,newIsDoneValue:newIsDoneValue

        type: 'CHANGE-TASK-STATUS', todolistId, taskId, newIsDoneValue
    } as const
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatus) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    //чтобы обновить нашу таску, найдем ее в state методом find
    const state = getState()

    const task = state.tasks[todolistId].find(task => task.id === taskId)

    if (task) {
        const model: UpdateTaskModel = {
            title: task.title,
            startDate: task.startDate,
            description: task.description,
            priority: task.priority,
            deadline: task.deadline,
            status
        }

        //?????????? todolistAPI.updateTask(todolistId,taskId,model).then(res => {
        //     //
        //     dispatch(changeTaskStatusAC(todolistId, taskId, status))
        //
        // })

    }


}




