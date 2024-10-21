import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {fn} from '@storybook/test';

import {AddItemForm, Props} from "../components/AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'TODOLISTS/AddItem Form',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: "Button clicked inside form ",
            // action: "clicked",
        }
    },
    args: {
        addItem: fn()
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args


} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {
    //опишем наш пропс приходящий

};



//ПОКАЗАТЬ КОМПАНЕНТУ С ОШИБКОЙ
//2ой-способ. Подтащили компаненту и в локальном стэйте прописали текст ошибки
//затем при помощи нового синтаксиса отрисовали историю

const AddItemFormError = memo((props: Props) => {


    const [newTaskTitle, setNewTaskTitle] = useState("")

    const [error, setError] = useState<string | null>("Title is required")

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
            <input
                value={newTaskTitle}
                onChange={changeNewItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
                className={error ? "task-input-error" : ""}
            />

            <TextField id="outlined-basic" variant="outlined"
                       helperText={error}
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

            {error && <div style={{color: "red"}}>{error}</div>}

            {newTaskTitle.trim().length > 10 && newTaskTitle.length < 15 &&
                <div>Recommended task length 10 characters</div>}
            {newTaskTitle.trim().length >= 15 && <div style={{color: "red"}}>Title is too long</div>}</div>
    );
});

export const AddItemFormErrorStory: Story = {
    render: (args) => <AddItemFormError addItem={args.addItem}/>
}