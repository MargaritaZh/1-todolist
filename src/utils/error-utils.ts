import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/api";

// ResponseType<{ item: TaskType }


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        //выводим дефолтную ошибку
        dispatch(setAppErrorAC("Something went wrong"))
    }
    //убрать крутилку
    dispatch(setAppStatusAC("failed"))
}

//о что попадает в catch, 500-ая ошибка или отключили интернет
export const handleServerNetworkError =(error:{messages:string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.messages))
    //убрать крутилку
    dispatch(setAppStatusAC("failed"))

}