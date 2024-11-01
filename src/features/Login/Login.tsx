import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {getTheme} from "../../common/theme/theme";
import {useAppDispatch, useAppSelector} from "../../module/store";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {loginTC} from "./auth-reducer";
import {Navigate} from "react-router-dom";


type ErrorsType = {
    email?: string
    password?: string
}


export type LoginType = {
    email: string
    password: string
    rememberMe: boolean

}


export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector(state => state.app.themeMode)

    const theme = getTheme(themeMode)

    const validate = (values: any) => {
        const errors: ErrorsType = {}

        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.password.length < 10) {
            errors.password = "Password must be at least 10 characters"
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        return errors
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            //
            password: "",
            rememberMe: false,
        },
        validate,

        onSubmit: values => {
            // onSubmit принимает всю соБранную информацию с полей В values ,ее мы и дспатчим в TC
            dispatch(loginTC(values))

            // alert(JSON.stringify(values, null, 2))

            //зачистить форму после отправки данных
            formik.resetForm()
        },
    })

    console.log(formik.values)

    //достали значение isLoggedIn из стэйта, и если true-пользователь залогинен то,
    //перенаправим его на страницу тодолистов
    if (isLoggedIn) {
        return <Navigate to={"/todolists"}/>
    }


    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To login get registered
                            <a
                                style={{color: theme.palette.primary.main, marginLeft: '5px'}}
                                href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}
                                rel="noreferrer"
                            >
                                here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>
                            <b>Email:</b> free@samuraijs.com
                        </p>
                        <p>
                            <b>Password:</b> free
                        </p>
                    </FormLabel>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"

                                // name="email"
                                // onChange={formik.handleChange}
                                // value={formik.values.email}
                                //когда я поставила курсор в инпут, а потом отвела курсор в сторону ,зафиксирует это событие
                                // onBlur={formik.handleBlur}

                                // заменяет все закомментированное выше
                                {...formik.getFieldProps("email")}

                                // у поля из материал ul есть error и поле будет гореть красным,если есть ошибка
                                //переведем в булевое значение  error={true}
                                error={formik.touched.email && !!formik.errors.email}
                            />
                            {/*когда поле было тронуто и там есть ошибка, только в этом случае показываем ошибку*/}
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"

                                // name="password"
                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                                // onBlur={formik.handleBlur}

                                // заменяет все закомментированное выше
                                {...formik.getFieldProps("password")}
                                //
                                error={formik.touched.password && !!formik.errors.password}
                            />
                            {/*когда поле было тронуто и там есть ошибка, только в этом случае показываем ошибку*/}
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        //ОСТАВЛЯЕМ checked в checkbox!!!! БАГА-в нем нет values
                                        checked={formik.values.rememberMe}


                                        // name="rememberMe"
                                        // onChange={formik.handleChange}
                                        // заменяет все закомментированное выше
                                        {...formik.getFieldProps("rememberMe")}
                                    />
                                }/>
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
}