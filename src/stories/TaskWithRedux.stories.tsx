import type {Meta, StoryObj} from '@storybook/react';

import {TaskWithRedux} from "../TaskWithRedux";
import {ReduxStoreProviderDecorator, storyBookStore} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../module/store";
import {TaskType} from "../TodolistWithRedux";
import {v1} from "uuid";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/api/argtypes


    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args


} satisfies Meta<typeof TaskWithRedux>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args



//СДЕЛАЛИ ПРОКЛАДОЧЕУЮ КОМПАНЕНТУ, Т.К. в RENDER усли перенести код не видит store
const Task1 = () => {

    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistId1"][0])

    if (!task) task = {id: v1(), title: "Default", isDone: false}

    return <TaskWithRedux todolistId={"todolistId1"} task={task}/>
}


export const TaskWithReduxIsNotDoneStory: Story = {
    //хочет описание пропсов, горит ошибка

    args: {
        todolistId: '1htrhkjh',
        task: {id: v1(), title: "html", isDone: false},
    },

    render: () => <Task1/>

};

