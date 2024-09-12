import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {fn} from '@storybook/test';
import {Task} from "../Task";
import { useState} from "react";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    args: {
        taskId: '1hher222',
        taskTitle: "New task",
        isDone: false,
        changeTaskStatusHandler: fn(),
        upDateItemHandler: fn(),
        removeTaskHandler: fn()
    }

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args


} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const TaskIsNotDoneStory: Story = {
    //опишем наш пропс приходящий
    // args: {
    //     taskId: '1hher222',
    //     taskTitle: "New task",
    //     isDone: false,
    //     changeTaskStatusHandler: fn(),
    //     upDateItemHandler: fn(),
    //     removeTaskHandler: fn()
    // }
};


export const TaskIstDoneStory: Story = {
    //опишем наш пропс приходящий
    args: {
        isDone: true,
    }
};


//ОРГАНИЗОВАТЬ КОМПАНЕНТУ, ЧТОБЫ В STORYBOOK у нас работали callback, изменялся статус задачи,показывался отредактированный текст.ТОЛЬКО НЕ УДАЛЯТЬ ЗАДАЧУ-СЛОМАЕТСЯ STORYBOOK

const ToogleTask = () => {

    const [task, setTask] = useState({id: "hgd1bf", title: "New title", isDone: true})

    function changeTaskStatusHandler() {
        setTask({...task, isDone: !task.isDone})
    }

    function upDateItemHandler(newTitle: string) {
        setTask({...task, title: newTitle})
    }

    return <Task
        taskId={task.id}
        changeTaskStatusHandler={changeTaskStatusHandler}
        removeTaskHandler={action("remove task")}
        taskTitle={task.title}
        upDateItemHandler={upDateItemHandler}
        isDone={task.isDone}
    />
}

export const ToogleTaskStory: Story = {
    render: () => <ToogleTask/>
}