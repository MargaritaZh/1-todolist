import {createBrowserRouter, Navigate} from "react-router-dom";

import AppWithRedux from "../../app/AppWithRedux";
import {Login} from "../../features/Login/Login";
import {TodolistsList} from "../../features/TodolistsList/TodolistsList";
import {ErrorPage} from "../../components/Error/ErrorPage";


// export const Path = {
//     Login: 'login',
// } as const

export const router = createBrowserRouter([
    {
        // базовый путь
        path: '/',
        element: <AppWithRedux/>,
        // в пути не найденной страницы укажи в URL -стпаницы -404
        errorElement: <Navigate to="/404"/>,
        children: [
            //когда я ввожу базовый адрес -
            // куда будет перенаправлять нас при загрузке приложения,на какой children
            {
                index:true,
                element:<Navigate to="/login"/>
            },
            //
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: '/todolists',
                element: <TodolistsList/>,
            },
        ],
    },
    {
        path: '/404',
        element: <ErrorPage/>,
    },


])


