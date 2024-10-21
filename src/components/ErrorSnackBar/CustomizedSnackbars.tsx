import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../module/store";
import {setAppErrorAC} from "../../app/app-reducer";


export const CustomizedSnackbars = () => {
    // const [open, setOpen] = React.useState(false);
    //уберем локальный стэйт

    //перепишем а глобальный стэйт для отображения ошибок всего приложения взависимости от status
    const error = useAppSelector<string | null>(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        // setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        // setOpen(false);
        dispatch(setAppErrorAC(null))
    };

    return (
        <div>
            <Button onClick={handleClick}>Open Snackbar</Button>
            {/*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>*/}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </div>
    );
}