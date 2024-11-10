import {setAppStatus, setInitialised} from "../../app/appSlice";
import {Dispatch} from "redux";
import {LoginType} from "./Login";
import {authApi} from "../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../../module/todolistsSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// type InitialStateType = typeof initialState
//
// const initialState = {
//     isLoggedIn: false,
// }


export const authSlice = createSlice({
        name: "auth",
        initialState: {
            isLoggedIn: false,
        },
        // reducers: {
        //     //Подредьюсер или action
        //     setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
        //         state.isLoggedIn = action.payload.isLoggedIn
        //     }
        // }

        //НОВЫЙ СИНТАКСИС 2.0
        //ТЕПЕТЬ РЕДЬЮСЕР ОБЕРНУЛИ В ФУНКЦИЮ,КОТОРАЯ ВОЗВРАЩАЕТ ОБЪЕКТ
        reducers: (create) => {
            return {
                //Подредьюсер
                setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                })
                //
            }
        }
    }
)

export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions

// export const authSlice = (
//     state: InitialStateType = initialState,
//     action: ActionsType
// ): InitialStateType => {
//     switch (action.type) {
//         case 'SET_IS_LOGGED_IN':
//             return {...state, isLoggedIn: action.payload.isLoggedIn}
//         default:
//             return state
//     }
// }

// Action creators
// const setIsLoggedInAC = (isLoggedIn: boolean) => {
//     return {type: 'SET_IS_LOGGED_IN', payload: {isLoggedIn}} as const
// }

// Actions types
// type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {

    dispatch(setAppStatus({status:'loading'}))
    try {
        //если промис зарезолвился ,то отрабатывает эта логика в try
        const result = await authApi.login(data)
        if (result.data.resultCode === 0) {
            //пользователь залогинен
            dispatch(setIsLoggedIn({isLoggedIn: true}))

            dispatch(setAppStatus({status:'succeeded'}))
        } else {
            handleServerAppError(result.data, dispatch)
        }

    } catch (e) {
        handleServerNetworkError((e as unknown as { messages: string }), dispatch)
    }

    dispatch(setAppStatus({status:"succeeded"}))
}


//этот запрос нужен чтобы backEnd зачистил хранилище cookie
export const logOutTC = () => async (dispatch: Dispatch) => {

    dispatch(setAppStatus({status:'loading'}))
    try {
        //если промис зарезолвился ,то отрабатывает эта логика в try
        const result = await authApi.logOut()
        if (result.data.resultCode === 0) {
            //пользователь не залогинен
            //выйти из приложения false
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            //крутилку убери:
            dispatch(setAppStatus({status:'succeeded'}))

            //зачисти данные после вылогинивания
            dispatch(clearTodosDataAC())

        } else {
            handleServerAppError(result.data, dispatch)
        }

    } catch (e) {
        handleServerNetworkError((e as unknown as { messages: string }), dispatch)
    }
    dispatch(setAppStatus({status:"succeeded"}))
}


export const meTC = () => async (dispatch: Dispatch) => {

    dispatch(setAppStatus({status:'loading'}))
    try {
        //мы проверяем был ли пользователь залогнен до перезагрузка
        //и возвращаем те же данные в state что и были, если пользователь был залогинен ранее
        const result = await authApi.me()
        if (result.data.resultCode === 0) {
            //пользователь залогинен
            dispatch(setIsLoggedIn({isLoggedIn: true}))

            dispatch(setAppStatus({status:'succeeded'}))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as unknown as { messages: string }), dispatch)
    }
    //убрать моргание, покажем крутилку пока идет запрос me,изначально istInitialised-false-показывается крутилка на все приложение
//когда мы уже узнали ответ от сервера был ли пользователь ранее проинициализирован, неважно да или нет,
    //мы уже изменим значение istInitialised  на true и уберем крутилку

    dispatch(setInitialised({isInitialised:true}))
}


