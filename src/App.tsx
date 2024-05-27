import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "complited"

function App() {

    //BLL
    //data
    const todolistTitle_1 = "What to learn?"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    //change logic
    //delete
    const removeTask = (taskId: string) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    //create
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        let nextTasksState = [newTask, ...tasks]
        setTasks(nextTasksState)

    }

    //UI logic
    const changeTaskStatus = (taskId: string, newIsDoneValue:boolean) => {
        // const taskForUpdate: TaskType | undefined = tasks.find(t => t.id === taskId)
        // if(taskForUpdate){
        // taskForUpdate.isDone=!taskForUpdate.isDone
        // const copy=[...tasks]
        // setTasks(copy)

        const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        setTasks(nextState)

    }


//UI
    return (
        <div className="App">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks}
                removeTask={removeTask}
                addTask={addTask}
                // changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />

        </div>
    );
}

export default App;
