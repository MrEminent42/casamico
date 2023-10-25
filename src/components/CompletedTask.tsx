import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';

function hexToRgb(hex: string, alpha: number) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface CompletedTaskProps {
    title: string;
    due: string;
    complete: boolean;
    handleClick: () => void;
}

const CompletedTaskCard = ({ title, due, complete, handleClick }: CompletedTaskProps) => {
    const [isComplete, setIsComplete] = useState(complete);

    const handleCheckboxClick = () => {
        setIsComplete(!isComplete);
        handleClick();
    }

    return (
        <TaskBackground style={{backgroundColor: hexToRgb('#94a3b8', 0.5)}}>
            <TaskForeground style={{backgroundColor: '#94a3b8'}}>
                <BasicCheckbox 
                    checked={complete} 
                    onClick={handleCheckboxClick}
                    color='default'
                />
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

export default CompletedTaskCard

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
