import { tasksReducer } from './tasksSlice'
import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction,} from 'redux'
import {todolistsReducer} from "./todolistsSlice";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "../app/appSlice";
import {authReducer, authSlice} from "../features/Login/authSlice";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer,
   auth: authReducer,

})
// непосредственно создаём store
//для обычного redux
// export const store = legacy_createStore(rootReducer,{},applyMiddleware(thunk))

//для redux toolkit
//не нужно подключать thunkMiddleWare -он автоматически работает
export const store =configureStore({
    reducer:rootReducer,
})


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType=ThunkDispatch<AppRootStateType,any, UnknownAction>

//создадим переменную,чтобы не писать типизацию dispatch по всему приложению
export const useAppDispatch=useDispatch<AppDispatchType>


export const useAppSelector:TypedUseSelectorHook<AppRootStateType>=useSelector


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
