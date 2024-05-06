import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    //data
    const todolistTitle_1 = "What to learn?"
    const [ tasks,setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])
    //change logic
const removeTasks=(taskId:number)=>{
const  nextState=tasks.filter(t=>t.id!==taskId)
    setTasks(nextState)
}


    //UI
    return (
        <div className="App">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks}
                removeTasks={removeTasks}
            />

        </div>
    );
}

export default App;
