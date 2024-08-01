import {v1} from "uuid";
import {TodolistType} from "../App";
import {todolistReducer} from "./todolists-reducer";



test("correct todolist should be removed", () => {

    let todolistID1 = v1()
    let todolistID2 = v1()

    //1. стартовый state
    const startState: TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    //2. действие
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistID1,
        }
    } as const

    const endState = todolistReducer(startState, action)

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
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist',
        },
    } as const

    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})
