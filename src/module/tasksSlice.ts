import {Dispatch} from "redux";
import {TaskPriority, TaskStatus, TaskType, todolistAPI, UpdateTaskModelType} from "../api/api";
import {AppRootStateType} from "./store";
import {
    changeEntityStatus, clearTodosData,
    createTodolist,
    deleteTodolist, setTodos, TodolistDomainType
} from "./todolistsSlice";
import {setAppError, setAppStatus} from "../app/appSlice";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice} from "@reduxjs/toolkit";


// type ActionsType =
// DeleteTaskActionType
//     | AddTasksActionType
//     | UpdateTaskActionType
// | CreateTodolistActionType
// | DeleteTodolistActionType
// | SetTodosActionType
// | SetTasksActionType
// | SetAppStatusActionType
// | SetAppErrorActionType
// | ClearDataActionType


export type TasksStateType = {
    [key: string]: TaskType[]
}


// const initialState: TasksStateType = {}

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksStateType,
    reducers: (create) => {
        return {
            setTasks: create.reducer<{ tasks: Array<TaskType>, todolistId: string }>((state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            }),
            deleteTask: create.reducer<{ todolistId: string, taskId: string }>((state, action) => {

                // const tasks = state.tasks.filter(task => task.id === action.payload.todolistId);

                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((task) => task.id === action.payload.taskId);
                if (index !== -1) {
                    state.tasks.splice(index, 1);
                }
            }),
            createTask: create.reducer<{ task: TaskType }>((state, action) => {

                // return {
                //     ...state,
                //     [action.payload.task.todoListId]: [{
                //         ...action.payload.task,
                //     }, ...state[action.payload.task.todoListId]]
                // }

                //МУТАБЕЛЬНО
                const tasks = state[action.payload.task.todoListId]
                tasks.unshift( action.payload.task)
            }),

            updateTask:create.reducer<{todolistId: string, taskId: string, model: UpdateDomainTaskModelType}>((state, action)=>{
                // {
                // ...state,
                //     [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                //     ...el,
                //     ...action.model
                // } : el)
                // }

                //МУТАБЕЛЬНО

                const tasks=state[action.payload.todolistId]

                const index = tasks.findIndex((task) => task.id === action.payload.taskId)

                // const task=tasks[index]

                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            }),
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setTodos,(state, action)=>{
                // этот кейс в двух редьюсерах используется AC setTodolistAC , т.к. по tlId создается ключ в объекте тасок

                    //пееберем пришедший с сервера массив тодолистов,чтобы по id тодолистов создать в {} тасок
                    // и в пустом {} создадим свойства с  ключами [tl.id] => и заченями пустой массив
                    action.payload.todolists.forEach(tl => {
                        state[tl.id] = []
                    })
                    //возвращаем получившийся объект { [tl1.id]:[],[tl2.id]:[],[tl3.id]:[] }

            })
            .addCase(createTodolist, (state, action) => {
                //создали ключ в пустом {} тасок по id тодолиста и значение пустой [] для будующих тасок
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodolist, (state, action) => {

                delete state[action.payload.id]
            })
            .addCase(clearTodosData,(state, action)=>{
                return {}
            })
    }
})


export const tasksReducer = tasksSlice.reducer
export const {setTasks, deleteTask, createTask,updateTask} = tasksSlice.actions


// export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
//     switch (action.type) {


/////////////
// case "SET-TASKS": {
//     return {
//         ...state,
//         [action.payload.todolistId]: action.payload.tasks
//     }
// }
//////////////
// case "DELETE-TASK": {
//     return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
//     }
// }

// case "CREATE-TASK": {
//     return {
//         ...state,
//         [action.payload.task.todoListId]: [{
//             ...action.payload.task,
//         }, ...state[action.payload.task.todoListId]]
//     }
// }
///////////////

// case
// "UPDATE-TASK"
// :
// {
//     return {
//         ...state,
//         [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
//             ...el,
//             ...action.model
//         } : el)
//     }
// }

// // этот кейс в двух редьюсерах используется AC setTodolistAC , т.к. по tlId создается ключ в объекте тасок
// case
// "SET-TODOLISTS"
// :
// {
//     //создадим копию state=>пустого {}
//     const copyState = {...state}
//     //пееберем пришедший с сервера массив тодолистов,чтобы по id тодолистов создать в {} тасок
//     // и в пустом {} создадим свойства с  ключами [tl.id] => и заченями пустой массив
//     action.payload.todolists.forEach(tl => {
//         copyState[tl.id] = []
//     })
//     //возвращаем получившийся объект { [tl1.id]:[],[tl2.id]:[],[tl3.id]:[] }
//     return copyState
// }

/////
// case "CREATE-TODOLIST": {
//     return {
//         ...state,
//         //создали ключ в пустом {} тасок по id тодолиста и значение пустой [] для будующих тасок
//         [action.payload.todolist.id]: []
//     }
// }

// case "DELETE-TODOLIST": {
//     const copyState = {...state}
//     delete copyState[action.payload.id]
//     return copyState
// }

// case
// "CLEA-DATA"
// :
// return {}

// default:
// return state
// throw new Error("I don't understand this type")
//     }
// }

//as const фиксирует посимвольно значение строки type в action, чтобы в дальнейшем распозвать это значение в switch case,(в нашем случае зафиксировали весь объект просто, а можно только строку type сделать as const)


///////////////////////////////////

// export type SetTasksActionType = ReturnType<typeof setTasksAC>

// const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
//     type: "SET-TASKS", payload: {tasks, todolistId}
// } as const)

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    //покажи крутилку
    dispatch(setAppStatus({status: "loading"}))

    todolistAPI.getTasks(todolistId).then((res) => {
        //res.data.items-массив тасок

        //!!для getTasksTC проверку на ResultCode делать не надо
        dispatch(setTasks({tasks: res.data.items, todolistId: todolistId}))
        //убери крутилку
        dispatch(setAppStatus({status: "succeeded"}))
    })
}
////////////////////

// type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>

// const deleteTaskAC = (todolistId: string, taskId: string) => ({type: 'DELETE-TASK', todolistId, taskId,} as const)


export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    //покажи крутилку
    dispatch(setAppStatus({status: "loading"}))

    todolistAPI.deleteTask({todolistId, taskId}).then((res) => {
        //res.data.data

        if (res.data.resultCode === Result_Code.SUCCESS) {
            dispatch(deleteTask({todolistId: todolistId, taskId: taskId}))
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
//////////////////
// type AddTasksActionType = ReturnType<typeof createTasksAC>

//ПЕРЕПИСЫВАЕМ AC , теперь мы получаем готовую таску с СЕРВЕРА!!
// export const addTasksAC = (todolistId: string, title: string) => {
// const createTasksAC = (task: TaskType) => ({type: 'CREATE-TASK', payload: {task}} as const)
//

//enum как константа, ее нельзя изменить
export enum Result_Code {
    SUCCESS = 0,
    ERROR = 1,
    RECAPTCHA_ERROR = 10
}

export const createTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    //покажи крутилку
    dispatch(setAppStatus({status: "loading"}))

    todolistAPI.createTask({title, todolistId})
        .then((res) => {
            //(res.data.data.item)

            if (res.data.resultCode === Result_Code.SUCCESS) {
                //ОТПРАВИМ УЖЕ ПОЛУЧЕННУЮ ТАСКУ, ГОТОВЫЙ {c таской} c сервера в createTasksAC
                dispatch(createTask({task: res.data.data.item}))
                //убери крутилку
                dispatch(setAppStatus({status: "succeeded"}))
            } else {

                handleServerAppError(res.data, dispatch)

                // if (res.data.messages.length) {
                //     dispatch(setAppErrorAC(res.data.messages[0]))
                // } else {
                //     //выводим дефолтную ошибку
                //     dispatch(setAppErrorAC("Something went wrong"))
                // }
                // //убрать крутилку
                // dispatch(setAppStatusAC("failed"))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
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
// export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

// export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (
//     {type: "UPDATE-TASK", todolistId: todolistId, taskId: taskId, model} as const)

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        //покажи крутилку
        dispatch(setAppStatus({status: "loading"}))

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


        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {

                if (res.data.resultCode === Result_Code.SUCCESS) {
                    //когда пришел твет с сервера, то уже обновляем в BLL и т.д.
                    dispatch(updateTask({todolistId:todolistId, taskId:taskId, model:domainModel}))
                    //убери крутилку
                    dispatch(setAppStatus({status: "succeeded"}))
                } else {

                    handleServerAppError(res.data, dispatch)

                    // if (res.data.messages.length) {
                    //     dispatch(setAppErrorAC(res.data.messages[0]))
                    // } else {
                    //     //выводим дефолтную ошибку
                    //     dispatch(setAppErrorAC("Something went wrong"))
                    // }
                    // //убрать крутилку
                    // dispatch(setAppStatusAC("failed"))
                }

            })
            .catch((error) => {

                handleServerNetworkError(error, dispatch)
                // dispatch(setAppErrorAC(error.messages))
                // //убрать крутилку
                // dispatch(setAppStatusAC("failed"))
            })
    }
}

