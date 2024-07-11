import {Button} from "./Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    addItem:(title: string)=>void
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

    const isAddBthDisabled = newTaskTitle.length === 0 || newTaskTitle.trim().length >= 15
    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={changeNewItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
                className={error ? "task-input-error" : ""}
            />
            <Button
                title={'+'}
                onclickHandler={addNewItemHandler}
                disabled={isAddBthDisabled}
            />
            {error && <div style={{color: "red"}}>{error}</div>}

            {newTaskTitle.trim().length > 10 && newTaskTitle.length < 15 &&
                <div>Recommended task length 10 characters</div>}

            {newTaskTitle.trim().length >= 15 && <div style={{color: "red"}}>Title is too long</div>}
        </div>
    );
};

