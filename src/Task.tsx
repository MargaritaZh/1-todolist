import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

type Props = {
    taskId:string
    taskTitle:string
    isDone:boolean
    changeTaskStatusHandler:(e: ChangeEvent<HTMLInputElement>)=>void
    upDateItemHandler:(newTitle: string)=>void
    removeTaskHandler:()=>void
};
export const Task = (props: Props) => {
    return (
        <li key={props.taskId}>
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    checked={props.isDone}*/}
            {/*    onChange={props.changeTaskStatusHandler}*/}
            {/*/>*/}
            <Checkbox  checked={props.isDone}
                       onChange={props.changeTaskStatusHandler} />

            {/*<span className={task.isDone ? "is-done" : "task"}>{task.title}</span>*/}
            <EditableSpan
                oldTitle={props.taskTitle}
                isDone={props.isDone}
                upDateItem={props.upDateItemHandler}/>

            {/*<Button title={"X"} onclickHandler={props.removeTaskHandler}/>*/}
            <IconButton aria-label="delete"
                        onClick={props.removeTaskHandler}
            >
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </li>
    );
};