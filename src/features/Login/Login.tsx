import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import {getTheme} from "../../common/theme/theme";
import {useAppSelector} from "../../module/store";
import {useFormik} from "formik";


type ErrorsType = {
    email?: string
    password?: string
}

export const Login = () => {

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

        // onSubmit принимает всю соБранную информацию с полей В values ,ее мы и дспатчим в TC
        onSubmit: values => {


            alert(JSON.stringify(values, null, 2))
        },
    })

    console.log(formik.values)

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
                                name="email"
                                label="Email"
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                //когда я поставила курсор в инпут, а потом отвела курсор в сторону ,зафиксирует это событие
                                onBlur={formik.handleBlur}
                                // у поля из материал ul есть error и поле будет гореть красным,если есть ошибка
                                //переведем в булевое значение  error={true}
                                error={formik.touched.email && !!formik.errors.email}
                            />
                            {/*когда поле было тронуто и там есть ошибка, только в этом случае показываем ошибку*/}
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                margin="normal"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                //
                                error={formik.touched.password && !!formik.errors.password}
                            />
                            {/*когда поле было тронуто и там есть ошибка, только в этом случае показываем ошибку*/}
                            {formik.touched.password && formik.errors.password && <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        onChange={formik.handleChange}
                                        checked={formik.values.rememberMe}
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