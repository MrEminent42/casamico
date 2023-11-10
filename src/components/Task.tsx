import { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import { Database } from '../supabase/supabase';

function hexToRgb(hex: string, alpha: number) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface TaskProps {
    task: Database['public']['Tables']['Tasks']['Row'];
    handleClick: (task: Database['public']['Tables']['Tasks']['Row']) => void;
}

const TaskCard = ({ task, handleClick }: TaskProps) => {
    const [isComplete, setIsComplete] = useState(task.completed);
    const currentDate = new Date();

    const handleCheckboxClick = () => {
        setIsComplete(!isComplete);
        handleClick(task);
    }

    function daysBetween(date1: Date, date2: Date) {
        // The number of milliseconds in one day
        const ONE_DAY = 1000 * 60 * 60 * 24

        // Calculate the difference in milliseconds
        const differenceMs = date1.getTime() - date2.getTime()

        // Convert back to days and return
        return Math.round(differenceMs / ONE_DAY) + 1
    }

    return (
        <TaskBackground style={{ backgroundColor: task.completed ? hexToRgb('#94a3b8', 0.5) : hexToRgb(task.color, 0.5) }}>
            <TaskForeground style={{ backgroundColor: task.completed ? '#94a3b8' : task.color }}>
                <BasicCheckbox
                    checked={task.completed}
                    onClick={handleCheckboxClick}
                    color='default'
                />
                <TaskTitle>
                    {task.title}
                </TaskTitle>
            </TaskForeground>
            <TaskDue>
                {daysBetween(new Date(task.due_date), currentDate) >= 0 ?
                    daysBetween(new Date(task.due_date), currentDate) + " days left" :
                    "Overdue"}
            </TaskDue>
        </TaskBackground >
    )
}

export default TaskCard

const TaskBackground = styled.div`
    display: flex;
    align-items: center;
    padding: 0;
    height: 55px;
    border-radius: 12px;
    width: 80vw;
`

const TaskForeground = styled.div`
    display: flex;
    align-items: center;
    padding: 0;
    padding-left: 10px;
    height: 55px;
    border-radius: 12px;
    width: 60vw;
`

const TaskTitle = styled.p`
    font-size: 18px;
    color: black;
    margin: 10px;
`

const TaskDue = styled.p`
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    margin: 10px;
    margin-left: auto;
    padding-right: 10px;
`

const BasicCheckbox = styled(Checkbox)`
    margin: 0;
    padding: 0;
`
