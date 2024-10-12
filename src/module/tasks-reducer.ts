import {Dispatch} from "redux";
import {TaskPriority, TaskStatus, TaskType, todolistAPI, UpdateTaskModelType} from "../api/api";
import {AppRootStateType} from "./store";
import {CreateTodolistActionType, DeleteTodolistActionType, SetTodosActionType} from "./todolists-reducer";


type ActionsType =
    DeleteTaskActionType
    | AddTasksActionType
    | UpdateTaskActionType
    | CreateTodolistActionType
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

        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    ...action.model
                } : el)
            }
        }

        /////
        case "CREATE-TODOLIST": {
            return {
                ...state,
                //создали ключ в пустом {} тасок по id тодолиста и значение пустой [] для будующих тасок
                [action.payload.todolist.id]: []
            }
        }

        case "DELETE-TODOLIST": {
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


//чтобы не путать с типом просто UpdateTaskModelType в api
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {

    return {type: "UPDATE-TASK", todolistId: todolistId, taskId: taskId, model} as const
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType,) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//сначало обновим на сервере
        //1 при помощи функции getState мы находим наш state
        const state = getState()
//находим нужную таску
        const task = state.tasks[todolistId].find(t => t.id === taskId)
//если ее нет сообщение ошибки
        if (!task) {
            console.warn("task not found in the state")
            return
        }
//возьмем для объекта model данные из найденной таски и зафиксируем их.
// Потом перезатрем новыми, пришедшими с UI ...domainModel(МОЖЕТ БЫТЬ ОДНО НАПРИМЕР TITLE)
        const apiModel: UpdateTaskModelType = {
            status: task.status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, apiModel).then(res => {

            //когда пришел твет с сервера, то уже обновляем в BLL и т.д.
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
        })
    }
}

