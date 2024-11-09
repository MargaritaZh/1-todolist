import {setAppStatusAC, setInitialisedAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {LoginType} from "./Login";
import {authApi} from "../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearTodosDataAC} from "../../module/todolists-reducer";
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
    reducers: {
        //Подредьюсер или action
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = authSlice.reducer
export const {setIsLoggedInAC} = authSlice.actions

// export const authReducer = (
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

    dispatch(setAppStatusAC('loading'))
    try {
        //если промис зарезолвился ,то отрабатывает эта логика в try
        const result = await authApi.login(data)
        if (result.data.resultCode === 0) {
            //пользователь залогинен
            dispatch(setIsLoggedInAC({isLoggedIn:true}))

            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }

    } catch (e) {
        handleServerNetworkError((e as unknown as { messages: string }), dispatch)
    }

    dispatch(setAppStatusAC("succeeded"))
}


//этот запрос нужен чтобы backEnd зачистил хранилище cookie
export const logOutTC = () => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'))
    try {
        //если промис зарезолвился ,то отрабатывает эта логика в try
        const result = await authApi.logOut()
        if (result.data.resultCode === 0) {
            //пользователь не залогинен
            //выйти из приложения false
            dispatch(setIsLoggedInAC({isLoggedIn:false}))
            //крутилку убери:
            dispatch(setAppStatusAC('succeeded'))

            //зачисти данные после вылогинивания
            dispatch(clearTodosDataAC())

        } else {
            handleServerAppError(result.data, dispatch)
        }

    } catch (e) {
        handleServerNetworkError((e as unknown as { messages: string }), dispatch)
    }
    dispatch(setAppStatusAC("succeeded"))
}


export const meTC = () => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'))
    try {
        //мы проверяем был ли пользователь залогнен до перезагрузка
        //и возвращаем те же данные в state что и были, если пользователь был залогинен ранее
        const result = await authApi.me()
        if (result.data.resultCode === 0) {
            //пользователь залогинен
            dispatch(setIsLoggedInAC({isLoggedIn:true}))

            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError((e as unknown as { messages: string }), dispatch)
    }
    //убрать моргание, покажем крутилку пока идет запрос me,изначально istInitialised-false-показывается крутилка на все приложение
//когда мы уже узнали ответ от сервера был ли пользователь ранее проинициализирован, неважно да или нет,
    //мы уже изменим значение istInitialised  на true и уберем крутилку

    dispatch(setInitialisedAC(true))
}


