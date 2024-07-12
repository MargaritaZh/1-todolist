import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";

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
            <input
                type="checkbox"
                checked={props.isDone}
                onChange={props.changeTaskStatusHandler}
            />
            {/*<span className={task.isDone ? "is-done" : "task"}>{task.title}</span>*/}
            <EditableSpan
                oldTitle={props.taskTitle}
                isDone={props.isDone}
                upDateItem={props.upDateItemHandler}/>
            <Button title={"X"} onclickHandler={props.removeTaskHandler}/>
            {/*<button onClick={() => removeTasks(task.id)}>x</button>*/}
        </li>
    );
};