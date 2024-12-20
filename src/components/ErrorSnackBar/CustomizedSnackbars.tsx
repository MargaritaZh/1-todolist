import * as React from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../../module/store";
import {selectAppError, setAppError} from "../../app/appSlice";


export const CustomizedSnackbars = () => {
    // const [open, setOpen] = React.useState(false);
    //уберем локальный стэйт

    //перепишем а глобальный стэйт для отображения ошибок всего приложения взависимости от status

    const error = useAppSelector(selectAppError)
    const dispatch = useAppDispatch()

    // const handleClick = () => {
    //     // setOpen(true);
    // };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        // setOpen(false);
        dispatch(setAppError({error:null}))
    };

    return (
        <div>
            {/*<Button onClick={handleClick}>Open Snackbar</Button>*/}

            {/*<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>*/}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {/*This is a success Alert inside a Snackbar!*/}
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}