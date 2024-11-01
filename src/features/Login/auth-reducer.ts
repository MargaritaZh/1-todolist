import {setAppStatusAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {LoginType} from "./Login";
import {authApi} from "../../api/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: 'SET_IS_LOGGED_IN', payload: {isLoggedIn}} as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'))
    try {
        //если промис зарезолвился ,то отрабатывает эта логика в try
        const result = await authApi.login(data)
        if (result.data.resultCode === 0) {
            //пользователь залогинен
            dispatch(setIsLoggedInAC(true))

            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }

    } catch (e) {
        handleServerNetworkError((e as unknown as { messages: string }), dispatch)
    }

    dispatch(setAppStatusAC("succeeded"))
}