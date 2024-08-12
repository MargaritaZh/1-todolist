import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTasktAC, changeTaskStatusAC, changeTaskTitleAC, removeTasktAC, tasksReducer} from "./tasks-reducer";
import {addTodolistsAC, deleteTodolistAC} from "./todolists-reducer";

test("correct task should be deleted from correct array", () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    //1. стартовый state
    const startState: TasksStateType = {
        [todolistId1]: [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        [todolistId2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Cheeps", isDone: true},
            {id: '3', title: "Fish", isDone: false}],
    }

    //2. действие   заменим action на вызов функции Action Creater (removeTaskAC) и передадим в нее параметр (todolistId: string, taskId: string)

    const action = removeTasktAC(todolistId2, "2")
    const endState = tasksReducer(startState, action)


//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям

    expect(endState).toEqual({
        [todolistId1]: [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        [todolistId2]: [
            {id: '1', title: "Beer", isDone: true},
            {id: '3', title: "Fish", isDone: false}],
    })
})


test("correct task should be added to correct array", () => {

    //1. стартовый state
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Cheeps", isDone: true},
            {id: '3', title: "Fish", isDone: false}],
    }

    //2. действие   заменим action на вызов функции Action Creater (addTaskAC) и передадим в нее параметр (todolistId: string, title: string))

    const action = addTasktAC("todolistId2", "juce")
    const endState = tasksReducer(startState, action)


//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям
    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(4)
    expect(endState["todolistId2"][0].id).toBeDefined()
    expect(endState["todolistId2"][0].title).toBe("juce")
    expect(endState["todolistId2"][0].isDone).toBe(false)
})


test("status of specified task should be changed", () => {

    //1. стартовый state
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Cheeps", isDone: true},
            {id: '3', title: "Fish", isDone: false}],
    }

    //2. действие   заменим action на вызов функции Action Creater (changeTaskStatusAC) и передадим в нее параметр (todolistId: string, taskId: string, newIsDoneValue: boolean)

    const action = changeTaskStatusAC("todolistId2", "2", false)
    const endState = tasksReducer(startState, action)


//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям
    expect(endState["todolistId1"][1].isDone).toBe(true)
    expect(endState["todolistId2"][1].isDone).toBe(false)
})


test("title of specified task should be changed", () => {

    //1. стартовый state
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Cheeps", isDone: true},
            {id: '3', title: "Fish", isDone: false}],
    }

    //2. действие   заменим action на вызов функции Action Creater (changeTaskTitleAC) и передадим в нее параметр (todolistId: string, taskId: string, newTitle: string)

    const action = changeTaskTitleAC("todolistId2", "2", "beer")
    const endState = tasksReducer(startState, action)


//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям
    expect(endState["todolistId1"][1].title).toBe("JS & TS")
    expect(endState["todolistId2"][1].title).toBe("beer")
})


test("new array should be added when new todolist is added", () => {

    //1. стартовый state
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Cheeps", isDone: true},
            {id: '3', title: "Fish", isDone: false}],
    }

    //2. действие   заменим action на вызов функции Action Creater (addTodolistsAC) и передадим в нее параметр  (newTitle: string)
    // !! Этот action используется в двух местах, так как при добавлении нового тодолиста, добавляютя новые данный в массив тодолистов и создается новый массив тасок для этог нового тодолиста


    const action = addTodolistsAC("new todolist")
    const endState = tasksReducer(startState, action)


//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test("property with todolist should be deleted", () => {

    //1. стартовый state
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "HTML & CSS", isDone: true},
            {id: "2", title: "JS & TS", isDone: true},
            {id: "3", title: "React", isDone: false}],
        "todolistId2": [
            {id: '1', title: "Beer", isDone: true},
            {id: '2', title: "Cheeps", isDone: true},
            {id: '3', title: "Fish", isDone: false}],
    }

    //2. действие   заменим action на вызов OБЩЕЙ функции Action Creater () и передадим в нее параметр


    const action = deleteTodolistAC("todolistId2")


    const endState = tasksReducer(startState, action)


//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
})


