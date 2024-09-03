export type ButtonPropsType = {
    title: string
    onclickHandler?: () => void
    disabled?:boolean
    classes?:string


}

export const Button = ({title, onclickHandler, disabled,classes}: ButtonPropsType) => {

    return (
        <button onClick={onclickHandler} disabled={disabled} className={classes}>
            <span>{title}</span>
        </button>
    )
}
