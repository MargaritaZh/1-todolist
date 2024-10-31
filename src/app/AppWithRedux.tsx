import React, {useEffect, useState} from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {getTodolistsTC} from "../module/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../module/store";
import LinearProgress from '@mui/material/LinearProgress';
import {CustomizedSnackbars} from "../components/ErrorSnackBar/CustomizedSnackbars";
import {Outlet} from "react-router-dom";


type ThemeMode = "dark" | "light"

function AppWithRedux() {

    const status = useAppSelector(state => state.app.status)


    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])


    const [themeMode, setThemeMode] = useState<ThemeMode>("light")

    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: '#cf45cf',
            },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode == "light" ? "dark" : "light")
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