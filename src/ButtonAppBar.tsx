import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import Switch from '@mui/material/Switch';
import {useTheme} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./module/store";
import {logOutTC} from "./features/Login/authSlice";

type ButtonAppBarPropsType = {
    changeModeHandler: () => void
}

export default function ButtonAppBar({changeModeHandler}: ButtonAppBarPropsType) {
    const theme = useTheme()

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const logOut = () => {
        dispatch(logOutTC())
    }

    return (
        <Box sx={{flexGrow: 1, marginBottom: "80px"}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {/*<MenuButton color="inherit" background={theme.palette.primary.main}>Login</MenuButton>*/}
                    {isLoggedIn && <MenuButton
                        onClick={logOut}
                        color="inherit"
                    >Logout</MenuButton>}
                    {/*<MenuButton color="inherit">Faq</MenuButton>*/}

                    <Switch onChange={changeModeHandler}/>

                </Toolbar>
            </AppBar>
        </Box>
    );
}