import {ChangeEvent, memo} from "react";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from "./Todolist.styles";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskTC} from "./module/tasks-reducer";
import {useAppDispatch} from "./module/store";
import {TaskStatus, TaskType} from "./api/api";



type Props = {
    todolistId: string
    task: TaskType
};
export const TaskWithRedux = memo(({todolistId,task}: Props) => {

    const dispatch =useAppDispatch()


    const removeTaskHandler = () => dispatch(deleteTaskTC(todolistId, task.id))

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.id,e.currentTarget.checked))

    }

    const upDateItemHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, newTitle))
    }


    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>

            <div>
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    checked={props.isDone}*/}
                {/*    onChange={props.changeTaskStatusHandler}*/}
                {/*/>*/}
                <Checkbox checked={task.status === TaskStatus.Completed}
                    // onChange={props.changeTaskStatusHandler}/>
                          onChange={changeTaskStatusHandler}/>

                {/*<span className={task.isDone ? "is-done" : "task"}>{task.title}</span>*/}
                <EditableSpan
                    oldTitle={task.title}
                    isDone={task.status === TaskStatus.Completed}
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
