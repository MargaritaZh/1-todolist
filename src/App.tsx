import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "complited"

function App() {
    console.log("APP")
    //data
    const todolistTitle_1 = "What to learn?"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])

    //change logic
    const removeTasks = (taskId: number) => {
        const nextState = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

//UI logic (которая влияет на жизнь компаненты, но не относится к глобальным даным)
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter=(filter: FilterValuesType)=>{
        setFilter(filter)
    }

    const getFilteredTasks = (allTasts: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        if (filterValue === "active") {
            return allTasts.filter(t => t.isDone === false)
        } else if (filterValue === "complited") {
            return allTasts.filter(t => t.isDone === true)
        } else {
            return allTasts
        }
        // switch (filterValue) {
        //     case "active":
        //         return allTasts.filter(t => t.isDone === false)
        //     case "complited":
        //         return allTasts.filter(t => t.isDone === true)
        //     default:
        //         return allTasts
        // }
    }

    const filteredTasks: Array<TaskType> = getFilteredTasks(tasks,filter)


    //UI
    return (
        <div className="App">
            <Todolist
                title={todolistTitle_1}
                tasks={filteredTasks}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
