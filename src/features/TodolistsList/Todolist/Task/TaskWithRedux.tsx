import {ChangeEvent, memo} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from "../../../../Todolist.styles";
import {deleteTaskTC, updateTaskTC} from "../../../../module/tasksSlice";
import {useAppDispatch} from "../../../../module/store";
import {TaskStatus, TaskType} from "../../../../api/api";
import {RequestStatusType} from "../../../../app/appSlice";


type Props = {
    todolistId: string
    task: TaskType
    entityStatus: RequestStatusType
}

export const TaskWithRedux = memo(({todolistId, entityStatus, task}: Props) => {


    const dispatch = useAppDispatch()


    const removeTaskHandler = () => dispatch(deleteTaskTC(todolistId, task.id))

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //изменить status таски при помощи объекта model
        let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
        dispatch(updateTaskTC(todolistId, task.id, {status: status}))

    }

    const upDateItemHandler = (newTitle: string) => {
        //изменить title таски при помощи объекта model
        // dispatch(changeTaskTitleAC(todolistId, task.id, newTitle))
        dispatch(updateTaskTC(todolistId, task.id, {title: newTitle}))
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
                          onChange={changeTaskStatusHandler}
                          disabled={entityStatus === "loading"}
                />

                {/*<span className={task.isDone ? "is-done" : "task"}>{task.title}</span>*/}
                <EditableSpan
                    oldTitle={task.title}
                    isDone={task.status === TaskStatus.Completed}
                    // upDateItem={props.upDateItemHandler}/>
                    upDateItem={upDateItemHandler}
                    disabled={entityStatus === "loading"}
                />

            </div>

            {/*<Button title={"X"} onclickHandler={props.removeTaskHandler}/>*/}
            <IconButton aria-label="delete"
                // onClick={props.removeTaskHandler}
                        onClick={removeTaskHandler}
                        disabled={entityStatus === "loading"}
            >
                <DeleteIcon fontSize="inherit"/>
            </IconButton>
        </ListItem>
    );
});
