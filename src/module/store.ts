import {tasksReducer, tasksSlice} from './tasksSlice'
import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction,} from 'redux'
import {todolistsReducer, todolistsSlice} from "./todolistsSlice";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, appSlice} from "../app/appSlice";
import {authReducer, authSlice} from "../features/Login/authSlice";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsApi} from "../api/api";
import {setupListeners} from "@reduxjs/toolkit/query";

//просто REDUX
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer,
//     app:appReducer,
//    auth: authReducer,
//
// })
// непосредственно создаём store
//для обычного redux
// export const store = legacy_createStore(rootReducer,{},applyMiddleware(thunk))

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
// window.store = store


//для REDUX toolkit 2.0
//не нужно подключать thunkMiddleWare -он автоматически работает
export const store =configureStore({
    // reducer:rootReducer,
    //заменим на:
    reducer:{
        // tasks: tasksReducer,
        // todolists: todolistsReducer,
        // app:appReducer,
        // auth: authReducer,
        //графа name в slice связана логикой и названием выше, при переходе на  Selectors
        [tasksSlice.name]:tasksReducer,
        [todolistsSlice.name]:todolistsReducer,
        [appSlice.name]:appReducer,
        [authSlice.name]:authReducer,

        //RTK query
        [todolistsApi.reducerPath]: todolistsApi.reducer,

    },
    ////RTK query-> подключаем middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todolistsApi.middleware),

})

//RTK query
setupListeners(store.dispatch)


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatchType=ThunkDispatch<AppRootStateType,any, UnknownAction>

//создадим переменную,чтобы не писать типизацию dispatch по всему приложению
export const useAppDispatch=useDispatch<AppDispatchType>
export const useAppSelector:TypedUseSelectorHook<AppRootStateType>=useSelector


