import {v1} from "uuid";
import {TodolistType} from "../App";
import {addTodolistsAC, changeFilterAC, deleteTodolistAC, todolistReducer, upDateTodolistAC} from "./todolists-reducer";


test("correct todolist should be removed", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    //1. стартовый state
    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    //2. действие
    // const action = {
    //     type: 'REMOVE-TODOLIST',
    //     payload: {
    //         id: todolistID1,
    //     }
    // } as const

    // const endState = todolistReducer(startState, action)

    //2. действие   заменим action на вызов функции Action Creater (deleteTodolistAC) и передадим в нее параметр (todolistID1)
    const endState = todolistReducer(startState, deleteTodolistAC(todolistID1))

//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям
//в массиве остается один тудулист
    expect(endState.length).toBe(1)
    //удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistID2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. действие
    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    } as const
    //
    // const endState = todolistReducer(startState, action)

    //2.  действиедействие   заменим action на вызов функции Action Creater (addTodolistsAC) и передадим в нее параметр (newTitle)
    const endState = todolistReducer(startState, addTodolistsAC())

//3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям
    expect(endState.length).toBe(3)
    // expect(endState[2].title).toBe(action.payload.title)
    //заменяем на
    expect(endState[2].title).toBe('New Todolist')
})


test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: 'New Todolist',
    //     },
    // } as const
    //
    // const endState = todolistReducer(startState, action)

    const endState = todolistReducer(startState, upDateTodolistAC(todolistId2))

    //3. Проверяем, что наши действия (изменения state) соответствуют ожиданиям
    expect(endState[0].title).toBe('What to learn')
    // expect(endState[1].title).toBe(action.payload.title)
    //заменяем на
    expect(endState[1].title).toBe( 'New Todolist')


})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: "CHANGE-TODOLIST-FIlTER",
    //     payload: {
    //         id: todolistId2,
    //         filter: 'completed',
    //     },
    // } as const

    // const endState = todolistReducer(startState, action)

    const endState = todolistReducer(startState, changeFilterAC(todolistId2))

    expect(endState[0].filter).toBe('all')
    // expect(endState[1].filter).toBe(action.payload.filter)
    //заменяем на
    expect(endState[1].filter).toBe('completed')

})