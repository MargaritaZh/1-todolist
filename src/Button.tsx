type ButtonPropsType = {
    title: string
    onclickHandler?: () => void
    disabled?:boolean
}

export const Button = ({title, onclickHandler, disabled}: ButtonPropsType) => {

    return (
        <button onClick={onclickHandler} disabled={disabled}>
            <span>{title}</span>
        </button>
    )
}
