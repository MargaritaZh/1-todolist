import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    const todolistTitle_1 = "What to learn?"
    const todolistTitle_2 = "What to buy?"
    const tasks1: Array<TaskType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: "Ice cream", isDone: true},
        {id: 2, title: "Milk", isDone: false},
        {id: 3, title: "Chocolate", isDone: true},
        {id: 4, title: "Coca-Cola", isDone: false},
    ]


    return (
        <div className="App">
            <Todolist title={todolistTitle_1} tasks={tasks1}/>
            <Todolist title={todolistTitle_2} tasks={tasks2}/>
        </div>
    );
}

export default App;
