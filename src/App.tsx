import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()


    const [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {
                id: todolistId1,
                title: "What to learn?",
                filter: "all",
            },
            {
                id: todolistId2,
                title: "What to buy?",
                filter: "all",
            },
        ])

    const [tasks, setTasks] = useState<TasksStateType>({
            [todolistId1]: [
                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "JS & TS", isDone: true},
                {id: v1(), title: "React", isDone: false}],
            [todolistId2]: [
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Cheeps", isDone: true},
                {id: v1(), title: "Fish", isDone: false}],
        }
    )

    //change logic
    //delete
    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)
        })

        // const nextState = tasks.filter(t => t.id !== taskId)
        // setTasks(nextState)
    }

    //create
    const addTask = (todolistId: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
        // [todolistId]:[...tasks[todolistId],newTask]})


        // const newTask: TaskType = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // let nextTasksState = [newTask, ...tasks]
        // setTasks(nextTasksState)

    }
    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists([...todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el)])

// //         найти нужный объект и засетать
// //        const currentTodo=todolists.find(el=>el.id===todolistId)
// //         if(currentTodo){
// //             currentTodo.filter=filter
// //             setTodolists([...todolists])
//         }

    }

    //UI logic
    const changeTaskStatus = (todolistId: string, taskId: string, newIsDoneValue: boolean) => {

        setTasks(
            {
                ...tasks,
                [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
            })

        // const nextState: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t)
        // setTasks(nextState)

    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        //удалить массив tasks, относящийся к нужному todolist
        // const copyTasks={...tasks}
        // delete copyTasks[todolistId]
        // setTasks(copyTasks)
        delete tasks[todolistId]
    }

    const addTodolists = (title: string) => {
        const newId = v1()

        const newTodo: TodolistType = {
            id: newId,
            title: title,
            filter: "all",
        }
        setTodolists([...todolists, newTodo])
        setTasks({
            ...tasks, [newId]: [
                {id: v1(), title: "HTML & CSS", isDone: true},
                {id: v1(), title: "JS & TS", isDone: true},
                {id: v1(), title: "React", isDone: false}]
        })
    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolists}/>
            {
                todolists.map(todolist => {

                    let tasksForTodolist = tasks[todolist.id]

                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasks[todolist.id].filter(task => !task.isDone)
                    }

                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasks[todolist.id].filter(task => task.isDone)
                    }
                    return (
                        <Todolist key={todolist.id}
                                  todolistId={todolist.id}
                                  title={todolist.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  addTask={addTask}
                                  changeFilter={changeFilter}
                                  filter={todolist.filter}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}
                        />
                    )
                })
            }
        </div>
    );
}


export default App