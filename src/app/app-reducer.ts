export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error: action.payload.error}
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS', payload: {status},
} as const)

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', payload: {error},} as const)


//type
type ActionsType = SetAppStatusActionType | SetAppErrorActionType

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>