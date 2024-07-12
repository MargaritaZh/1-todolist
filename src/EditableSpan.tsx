import * as React from 'react';
import {ChangeEvent, useState} from "react";

type Props = {
    oldTitle: string
    isDone?: boolean
    upDateItem:(newTitle:string)=>void
};
export const EditableSpan = (props: Props) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewtitle] = useState(props.oldTitle)
    console.log(newTitle)


    const activateEditModeHandler = () => {
        setEditMode(!editMode)
        if(editMode){
            addItemHandler()
        }
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewtitle(event.currentTarget.value)

    }


    const addItemHandler=()=>{
        props.upDateItem(newTitle)
    }

    return (
        editMode ?
            <input type={"text"}
                   value={newTitle}
                   onChange={changeTitleHandler}
                   onBlur={activateEditModeHandler}
                   autoFocus/>
            : <span className={props.isDone ? "is-done" : "task"}
                    onDoubleClick={activateEditModeHandler}>{props.oldTitle}</span>
    );

};