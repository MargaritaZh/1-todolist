import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./module/store";
import {DevSupport} from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from './dev';
import {RouterProvider} from "react-router-dom";
import {router} from "./common/router/router"; // Импортируем из папки dev

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <Provider store={store}>

        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            {/*мы уже отрисовываем не компаненту, а:   */}
            {/*<AppWithRedux/>*/}
            <RouterProvider router={router} />
        </DevSupport>
    </Provider>

    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

