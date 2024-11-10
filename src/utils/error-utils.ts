import {setAppError, setAppStatus} from "../app/appSlice";
import {Dispatch} from "redux";
import {ResponseType} from "../api/api";

// ResponseType<{ item: TaskType }


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error:data.messages[0]}))
    } else {
        //выводим дефолтную ошибку
        dispatch(setAppError({error:"Something went wrong"}))
    }
    //убрать крутилку
    dispatch(setAppStatus({status:"failed"}))
}

//о что попадает в catch, 500-ая ошибка или отключили интернет
export const handleServerNetworkError =(error:{messages:string}, dispatch: Dispatch) => {
    dispatch(setAppError({error:error.messages}))
    //убрать крутилку
    dispatch(setAppStatus({status:"failed"}))

}