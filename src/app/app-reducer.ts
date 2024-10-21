export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
}

type InitialStateType = typeof initialState

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'SET_STATUS':
            return { ...state, status: action.payload.status }
        default:
            return state
    }
}


type ActionsType=any

// export const setAppStatusAC = (status: RequestStatusType) => {
//     return {
//         type: 'SET_STATUS',
//         payload: { status },
//     } as const
// }