// import {v1} from "uuid";
// import {TasksStateType, TodolistType} from "../App";
// import {addTodolistsAC, deleteTodolistAC, todolistReducer} from "./todolists-reducer";
// import {tasksReducer} from "./tasks-reducer";
// import {start} from "node:repl";
//
// test("name should be equals", () => {
//
//     //1. стартовый state
//
//     const startTaskState: TasksStateType = {}
//     const startTodolistState: Array<TodolistType> = []
//
//
//     //2. действие
//     const action = addTodolistsAC("new todolist")
//
//     const endTaskState = tasksReducer(startTaskState, action)
//     const endTodolistState = todolistReducer(startTodolistState, action)
//
//
// //3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям
// //ОБЩЕЕ "id-jfefbebf" тодолиста будет собпадать со значением ключа в свойстве "id-jfefbebf"  объекта tasks
//
//     const keys = Object.keys(endTaskState)
//     const idFromTasks = keys[0]
//     const idFromTodolists = endTodolistState[0].id
//
//     expect(idFromTasks).toBe(action.payload.todolistId)
//     expect(idFromTodolists).toBe(action.payload.todolistId)
// })
