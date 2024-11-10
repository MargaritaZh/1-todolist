import {createSlice} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ThemeMode = "dark" | "light"

// const initialState = {
//     themeMode: "light" as ThemeMode,
//     status: 'loading' as RequestStatusType,
//     error: null as null | string,
//     isInitialised: false as boolean
// }

// type InitialStateType = typeof initialState

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: "light" as ThemeMode,
        status: 'loading' as RequestStatusType,
        error: null as null | string,
        isInitialised: false as boolean
    },
    reducers: (create) => {
        return {
            setAppStatus: create.reducer<{ status: RequestStatusType }>((state, action) => {
                state.status = action.payload.status
            }),
            setInitialised:create.reducer<{isInitialised: boolean}>((state,action)=>{
                state.isInitialised=action.payload.isInitialised

            }),
            setAppError: create.reducer<{ error: string | null }>((state, action) => {
                state.error = action.payload.error
            }),
            changeTheme:create.reducer<{themeMode: ThemeMode}>((state,action)=>{
                state.themeMode=action.payload.themeMode
            })
        }
    },
    // selectors:{
    //     selectThemeMode:(state)=>state.themeMode,
    //     selectAppStatus:(state)=>state.status,
    //     selectAppError:(state)=>state.error,
    // }
})


export const appReducer = appSlice.reducer

export const {setAppStatus,setAppError,setInitialised,changeTheme} = appSlice.actions

// export const {selectThemeMode,selectAppStatus,selectAppError}=appSlice.selectors




// export const appReducer = (
//     state: InitialStateType = initialState,
//     action: ActionsType
// ): InitialStateType => {
// switch (action.type) {
//     case "APP/SET-IS-INITIALISED":
    //     return {...state, isInitialised: action.isInitialised}
    // case "CHANGE_THEME":
    //     return {...state, themeMode: action.payload.themeMode}
        // case 'APP/SET-STATUS':
        //     return {...state, status: action.payload.status}
        // case "APP/SET-ERROR":
        //     return {...state, error: action.payload.error}
        // default:
        //     return state
//     }
// }

//action
// export const setAppStatusAC = (status: RequestStatusType) => ({
//     type: 'APP/SET-STATUS', payload: {status},
// } as const)

// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', payload: {error},} as const)

        // export const changeThemeAC = (themeMode: ThemeMode) => {
        //     return {
        //         type: "CHANGE_THEME",
        //         payload: {themeMode},
        //     } as const
        // }

        // export const setInitialisedAC = (isInitialised: boolean) => ({
        //     type: 'APP/SET-IS-INITIALISED',
        //     isInitialised
        // } as const)

//type


// type ActionsType =
// | SetAppStatusActionType
// | SetAppErrorActionType
// | ReturnType<typeof changeThemeAC>
// | setInitialisedActionType

// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

// export type setInitialisedActionType = ReturnType<typeof setInitialisedAC>