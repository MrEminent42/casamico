import React from 'react';
import styled from 'styled-components';

function hexToRgb(hex: string, alpha: number) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface TaskProps {
    title: string;
    due: string;
    bg_color: string;
}

const TaskCard = ({ title, due, bg_color }: TaskProps) => {
    return (
        <TaskBackground title={title} due={due} bg_color={bg_color}>
            <TaskForeground title={title} due={due} bg_color={bg_color}>
                <TaskTitle>
                    {title}
                </TaskTitle>
            </TaskForeground>
            <TaskDue>
                {due}
            </TaskDue>
        </TaskBackground>
    )
}

export default TaskCard

const TaskBackground = styled.div<TaskProps>`
    display: flex;
    align-items: center;
    padding: 0;
    height: 55px;
    border-radius: 12px;
    width: 80vw;
    background-color: ${props => hexToRgb(props.bg_color, 0.5)};
`

const TaskForeground = styled.div<TaskProps>`
    display: flex;
    align-items: center;
    padding: 0;
    height: 55px;
    border-radius: 12px;
    width: 60vw;
    background-color: ${props => props.bg_color};
`

const TaskTitle = styled.p`
    font-size: 18px;
    color: black;
    margin: 10px;
    padding-left: 10px;
`

const TaskDue = styled.p`
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    margin: 10px;
    margin-left: auto;
    padding-right: 10px;
`