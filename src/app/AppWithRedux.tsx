import React, {useEffect, useState} from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useAppDispatch, useAppSelector} from "../module/store";
import LinearProgress from '@mui/material/LinearProgress';
import {CustomizedSnackbars} from "../components/ErrorSnackBar/CustomizedSnackbars";
import {Outlet} from "react-router-dom";
import {meTC} from "../features/Login/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import {changeTheme, selectAppStatus, selectIsInitialised, selectThemeMode} from "./appSlice";
import {getTheme} from "../common/theme/theme";


function AppWithRedux() {
    const dispatch = useAppDispatch()

    const status = useAppSelector(selectAppStatus)
    const isInitialised = useAppSelector(selectIsInitialised)
    const themeMode = useAppSelector(selectThemeMode)

    const theme=getTheme(themeMode)

    const changeModeHandler = () => {
        dispatch(changeTheme({themeMode: themeMode === "light" ? "dark" : "light"}))
    }

    useEffect(() => {
        //1
        dispatch(meTC())

    }, []);


    //показываем крутилку  если приложение не проинициализировано,
    // а после запроса в  meTC -мы уже знаем точно результат и покажем то что нужно, когда сервер вернет ответ
    if (!isInitialised) {
        return (<div style={{
            position: "fixed", top: "30%", textAlign: "center",
            width: "100%"
        }}>
            <CircularProgress/>
        </div>)
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container fixed>
                    <ButtonAppBar changeModeHandler={changeModeHandler}/>
                    {status === "loading" && <LinearProgress color="secondary"/>}

                    {/*//*/}
                    {/*перенести в router, и теперь это лежит там по нужному пути в children*/}
                    {/*<TodolistsList/>*/}
                    {/*<Login/>*/}
                    {/*//*/}
                    <Outlet/>

                    <CustomizedSnackbars/>
                </Container>
            </ThemeProvider>
        </div>
    );
}


export default AppWithRedux