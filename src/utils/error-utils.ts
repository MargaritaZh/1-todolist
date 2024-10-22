import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {BaseResponse} from "../api/api";

// BaseResponse<{ item: TaskType }

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        //выводим дефолтную ошибку
        dispatch(setAppErrorAC("Something went wrong"))
    }
    //убрать крутилку
    dispatch(setAppStatusAC("failed"))
}