import {ChangeEvent, memo} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from "./Todolist.styles";
import {TaskType} from "./TodolistWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTasktAC} from "./module/tasks-reducer";
import {useDispatch} from "react-redux";


type Props = {
    todolistId: string
    task: TaskType
};
export const TaskWithRedux = memo(({todolistId,task}: Props) => {
    const dispatch = useDispatch()

    // const removeTaskHandler = () => removeTask(todolistId, task.id)
    const removeTaskHandler = () => dispatch(removeTasktAC(todolistId, task.id))

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
        dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked))
    }

    const upDateItemHandler = (newTitle: string) => {
        // props.upDateTask(props.todolistId, task.id, newTitle)
        dispatch(changeTaskTitleAC(todolistId, task.id, newTitle))
    }


    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>

            <div>
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    checked={props.isDone}*/}
                {/*    onChange={props.changeTaskStatusHandler}*/}
                {/*/>*/}
                <Checkbox checked={task.isDone}
                    // onChange={props.changeTaskStatusHandler}/>
                          onChange={changeTaskStatusHandler}/>

                {/*<span className={task.isDone ? "is-done" : "task"}>{task.title}</span>*/}
                <EditableSpan
                    oldTitle={task.title}
                    isDone={task.isDone}
                    // upDateItem={props.upDateItemHandler}/>
                    upDateItem={upDateItemHandler}/>

            </div>

            {/*<Button title={"X"} onclickHandler={props.removeTaskHandler}/>*/}
            <IconButton aria-label="delete"
                // onClick={props.removeTaskHandler}
                        onClick={removeTaskHandler}
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});
