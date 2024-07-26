import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from "./Todolist.styles";



type Props = {
    taskId: string
    taskTitle: string
    isDone: boolean
    changeTaskStatusHandler: (e: ChangeEvent<HTMLInputElement>) => void
    upDateItemHandler: (newTitle: string) => void
    removeTaskHandler: () => void
};
export const Task = (props: Props) => {
    return (
        <ListItem key={props.taskId} sx={getListItemSx(props.isDone)}>

            <div>
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    checked={props.isDone}*/}
                {/*    onChange={props.changeTaskStatusHandler}*/}
                {/*/>*/}
                <Checkbox checked={props.isDone}
                          onChange={props.changeTaskStatusHandler}/>

                {/*<span className={task.isDone ? "is-done" : "task"}>{task.title}</span>*/}
                <EditableSpan
                    oldTitle={props.taskTitle}
                    isDone={props.isDone}
                    upDateItem={props.upDateItemHandler}/>

            </div>

            {/*<Button title={"X"} onclickHandler={props.removeTaskHandler}/>*/}
            <IconButton aria-label="delete"
                        onClick={props.removeTaskHandler}
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
};
