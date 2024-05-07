type ButtonPropsType = {
    title: string
    onclickHandler?: () => void
}

export const Button = ({title, onclickHandler}: ButtonPropsType) => {


    return (
        <button onClick={onclickHandler}>
            <span>{title}</span>
        </button>
    )
}
