import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


type Props = {
    addItem: (title: string) => void
};
export const AddItemForm = (props: Props) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [error, setError] = useState<string | null>(null)

    const changeNewItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }

    const addNewItemHandler = () => {
        const trimmednewTaskTitle = newTaskTitle.trim()
        if (trimmednewTaskTitle !== "") {

            props.addItem(newTaskTitle)
        } else {
            setError("Title is required")
        }
        setNewTaskTitle("")
    }

    const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newTaskTitle) {
            addNewItemHandler()
        }
    }


    const buttonStyles = {
        maxWidth: "38px",
        maxHeight: "38px",
        minWidth: "38px",
        minHeight: "38px",
    }
    const isAddBthDisabled = newTaskTitle.length === 0 || newTaskTitle.trim().length >= 15

    return (
        <div>
            {/*<input*/}
            {/*    value={newTaskTitle}*/}
            {/*    onChange={changeNewItemTitleHandler}*/}
            {/*    onKeyUp={addItemOnKeyUpHandler}*/}
            {/*    className={error ? "task-input-error" : ""}*/}
            {/*/>*/}

            <TextField id="outlined-basic" variant="outlined"
                       // helperText={error}
                       label={error ? error : "Enter a title"}
                       size={"small"}
                       error={!!error}

                       value={newTaskTitle}
                       onChange={changeNewItemTitleHandler}
                       onKeyUp={addItemOnKeyUpHandler}
            />
            <Button variant="contained" disabled={isAddBthDisabled}
                    onClick={addNewItemHandler}
                    size="small"
                    style={buttonStyles}
            >+</Button>

            {/*{error && <div style={{color: "red"}}>{error}</div>}*/}

            {newTaskTitle.trim().length > 10 && newTaskTitle.length < 15 &&
                <div>Recommended task length 10 characters</div>}
            {newTaskTitle.trim().length >= 15 && <div style={{color: "red"}}>Title is too long</div>}
        </div>
    );
};

